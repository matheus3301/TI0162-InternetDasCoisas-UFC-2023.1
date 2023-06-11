#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Ultrasonic.h>

#define DEVICE_ID "ps-01"     // different for each device
#define MESSAGE_INTERVAL 1000 // miliseconds

#define LDR_PIN 36

#define TRIGGER_PIN 17
#define ECHO_PIN 16

#define RED_PIN 21
#define GREEN_PIN 13
#define BLUE_PIN 12

#define PRESENCE_MAX 4

const unsigned long baud = 9600;

const char *wifi_ssid = "brisa-2527995";
const char *wifi_password = "gv0nqszz";

const char *mqtt_host = "192.168.0.5";
const int mqtt_port = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
Ultrasonic ultrasonic(TRIGGER_PIN, ECHO_PIN);

long lastMessageMilis = 0;

short presenceCount = 0;
boolean isOccupied = false;

void setup_wifi();
void setup_mqtt();
void connect_mqtt();
void handle_mqtt_message(char *topic, byte *message, unsigned int message_size);

void set_actuator_color(uint8_t r, uint8_t g, uint8_t b);

double get_internal_temperature();
int get_ldr();

void send_ldr_data();
void send_temperature_data();
void handle_presence();
void send_presence_data();

void setup()
{
  Serial.begin(baud);
  Serial.println("[-] bootstrapping the device");

  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);

  set_actuator_color(0, 255, 255);
  delay(2000);

  set_actuator_color(255, 255, 0);
  setup_wifi();

  set_actuator_color(255, 0, 255);
  setup_mqtt();
  set_actuator_color(255, 255, 255);

  connect_mqtt();

  send_presence_data();
}

void loop()
{
  if (!mqttClient.connected())
  {
    set_actuator_color(255, 0, 255);

    connect_mqtt();

    set_actuator_color(255, 255, 255);
  }

  mqttClient.loop();

  long nowMilis = millis();
  if (nowMilis - lastMessageMilis >= MESSAGE_INTERVAL)
  {
    lastMessageMilis = nowMilis;

    Serial.println("[-] sending data to cloud now");

    send_temperature_data();
    send_ldr_data();
    handle_presence();
  }
}

void setup_wifi()
{
  Serial.println("[-] starting wifi module");

  Serial.printf("[-] trying to connect to %s\n", wifi_ssid);
  WiFi.begin(wifi_ssid, wifi_password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("[x] unable to connect yet");
  }

  Serial.printf("[-] successfully connected to %s\n", wifi_ssid);
  Serial.printf("[-] got ip %s\n", WiFi.localIP().toString().c_str());
}

void setup_mqtt()
{
  Serial.printf("[-] setting up the mqtt client\n");
  mqttClient.setServer(mqtt_host, mqtt_port);
  mqttClient.setCallback(handle_mqtt_message);
}

void handle_mqtt_message(char *topic, byte *message, unsigned int message_size)
{
  String msgBuffer;
  for (int i = 0; i < message_size; i++)
  {
    msgBuffer += (char)message[i];
  }

  Serial.printf("[-] new message on topic %s\n", topic);
  Serial.printf("[-] message: %s\n", msgBuffer);

  int command = msgBuffer.toInt();

  // TODO: handle all types of incoming messages
  switch (command)
  {
  case 0:
    set_actuator_color(0, 255, 0);
    break;

  case 1:
    set_actuator_color(0, 0, 255);
    break;

  case 2:
    set_actuator_color(255, 0, 0);
    break;

  case 3:
    set_actuator_color(255, 255, 255);
    break;

  default:
    break;
  }
}

void connect_mqtt()
{
  while (!mqttClient.connected())
  {
    Serial.println("[-] trying to establish connection with mqtt broker");

    if (mqttClient.connect(DEVICE_ID))
    {
      Serial.printf("[-] connected to broker with id %s\n", DEVICE_ID);

      mqttClient.subscribe("commands/" DEVICE_ID);
    }
    else
    {

      Serial.println("[x] could not connect to mqtt broker, waiting 5 seconds before trying again");
      delay(5000);
    }
  }
}

double get_internal_temperature()
{
  return 0;
}

int get_ldr()
{
  return analogRead(LDR_PIN);
}

void set_actuator_color(uint8_t r, uint8_t g, uint8_t b)
{
  digitalWrite(RED_PIN, r);
  digitalWrite(GREEN_PIN, g);
  digitalWrite(BLUE_PIN, b);
}

void send_ldr_data()
{
  String topic = "sensors/";
  topic += DEVICE_ID;
  topic += "/ldr";

  mqttClient.publish(topic.c_str(), String(get_ldr()).c_str());
}

void send_temperature_data()
{
  String topic;
  topic += "sensors/";
  topic += DEVICE_ID;
  topic += "/temperature";

  mqttClient.publish(topic.c_str(), String(get_internal_temperature(), 2).c_str());
}

void handle_presence()
{
  unsigned int readData = ultrasonic.read();

  if (!isOccupied)
  {
    if (40 >= readData && 2 <= readData)
    {
      presenceCount++;

      if (presenceCount >= PRESENCE_MAX)
      {
        isOccupied = true;
        send_presence_data();
      }
    }
    else
    {
      presenceCount = 0;
    }
  }
  else
  {
    if (40 >= readData && 2 <= readData)
    {
      presenceCount = 0;
    }
    else
    {
      presenceCount++;

      if (presenceCount >= PRESENCE_MAX)
      {
        isOccupied = false;
        send_presence_data();
      }
    }
  }
}

void send_presence_data()
{
  String topic = "sensors/";
  topic += DEVICE_ID;
  topic += "/presence";
  mqttClient.publish(topic.c_str(), String((isOccupied ? '1' : '0')).c_str());
}
