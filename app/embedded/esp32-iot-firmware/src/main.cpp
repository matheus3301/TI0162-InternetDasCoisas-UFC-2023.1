#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Ultrasonic.h>

#define DEVICE_ID "ps-01"     // different for each device
#define MESSAGE_INTERVAL 1000 // miliseconds
#define LDR_PIN 36

#ifdef __cplusplus
extern "C"
{
#endif
  uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

const unsigned long baud = 9600;

const char *wifi_ssid = "brisa-2527995";
const char *wifi_password = "gv0nqszz";

const char *mqtt_host = "192.168.0.11";
const int mqtt_port = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
Ultrasonic ultrasonic(17, 16);

long lastMessageMilis = 0;

void setup_wifi();
void setup_mqtt();
void connect_mqtt();
void handle_mqtt_message(char *topic, byte *message, unsigned int message_size);

double get_internal_temperature();
int get_ldr();

void setup()
{
  Serial.begin(baud);
  Serial.println("[-] bootstrapping the device");

  setup_wifi();
  setup_mqtt();
}

void loop()
{
  if (!mqttClient.connected())
  {
    connect_mqtt();
  }

  mqttClient.loop();

  long nowMilis = millis();
  if (nowMilis - lastMessageMilis >= MESSAGE_INTERVAL)
  {
    lastMessageMilis = nowMilis;

    Serial.println("[-] sending data to cloud now");

    String topic;
    topic += DEVICE_ID;
    topic += "/sensors/temperature";

    mqttClient.publish(topic.c_str(), String(get_internal_temperature(), 2).c_str());
    // Serial.println(String(get_internal_temperature(), 2).c_str());

    topic = DEVICE_ID;
    topic += "/sensors/ldr";

    mqttClient.publish(topic.c_str(), String(get_ldr()).c_str());
    // Serial.println(String(get_ldr()).c_str());

    topic = DEVICE_ID;
    topic += "/sensors/distance";
    mqttClient.publish(topic.c_str(), String(ultrasonic.read()).c_str());
    Serial.println(String(ultrasonic.read()).c_str());
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

  // TODO: handle all types of incoming messages
}

void connect_mqtt()
{
  while (!mqttClient.connected())
  {
    Serial.println("[-] trying to establish connection with mqtt broker");

    if (mqttClient.connect(DEVICE_ID))
    {
      Serial.printf("[-] connected to broker with id %s\n", DEVICE_ID);

      String commandsTopic;
      commandsTopic += DEVICE_ID;
      commandsTopic += "/commands";

      mqttClient.subscribe(commandsTopic.c_str());
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
  return (temprature_sens_read() - 32) / 1.8;
}

int get_ldr()
{
  return analogRead(LDR_PIN);
}