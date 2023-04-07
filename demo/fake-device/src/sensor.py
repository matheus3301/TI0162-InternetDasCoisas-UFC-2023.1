import paho.mqtt.client as mqtt


class Sensor():
    def __init__(self, filename: str, sampling_period: float, mqtt_hostname: str, mqtt_port: int,  mqtt_username: str, mqtt_token: str) -> None:
        self.__filename = filename
        self.__sampling_period = sampling_period
        self.__mqtt_hostname = mqtt_hostname
        self.__mqtt_port = mqtt_port
        self.__mqtt_username = mqtt_username
        self.__mqtt_token = mqtt_token

        client = mqtt.Client()
        client.username_pw_set(self.__mqtt_username, self.__mqtt_token)
        client.on_connect = self.__on_connect
        client.on_message = self.__on_message

        client.connect(self.__mqtt_hostname, self.__mqtt_port)
        client.loop_forever()

    def __on_connect(self, client, userdata, flags, rc) -> None:
        print(f"[x] Connected on {self.__mqtt_hostname} with result code {rc}")

    def __on_message(self, userdata, message) -> None:
        print(f"[x] Received message: {message.payload}")
