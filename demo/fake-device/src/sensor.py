import paho.mqtt.client as mqtt
import csv
import json
import time


class Sensor():
    def __init__(self, filename: str, sampling_period: float, mqtt_hostname: str, mqtt_port: int,  mqtt_username: str, mqtt_token: str) -> None:
        print("[x] Starting the sensor")

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
        client.loop_start()

        print(
            f"[x] Starting sending data with a sample period of {self.__sampling_period} seconds"
        )
        while True:
            with open(self.__filename, newline='', encoding='utf-8-sig') as csvfile:
                print('[x] Opened the csv file successfully')

                spamreader = csv.DictReader(csvfile, delimiter=",")

                for data in spamreader:
                    # adding timestamp to payload
                    for key in data:
                        data[key] = float(data[key])

                    data['timestamp'] = time.time_ns()

                    transformed_data = [
                        {'variable': key, 'value': data[key]} for key in data
                    ]
                    print(json.dumps(transformed_data))

                    # send data over mqtt
                    client.publish('person-activity',
                                   json.dumps(transformed_data)
                                   )
                    time.sleep(self.__sampling_period)

    def __on_connect(self, client, userdata, flags, rc) -> None:
        print(f"[x] Connected on {self.__mqtt_hostname} with result code {rc}")

    def __on_message(self, userdata, message) -> None:
        print(f"[x] Received message: {message.payload}")
