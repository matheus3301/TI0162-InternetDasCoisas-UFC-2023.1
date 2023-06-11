import util
import data
import json

from paho.mqtt.properties import Properties
from paho.mqtt.packettypes import PacketTypes


def on_publish(client, userdata, result):
    print("[-] message sent")


def on_message(client, userdata, message):
    # print(f"[-] new sensor data on topic {message.topic}")
    pass


def on_new_temperature(client, userdata, message):
    # print(f"[-] new temperature data {message.payload.decode()}")
    pass


def on_new_presence(client, userdata, message):
    print(f"[-] new presence data {message.payload.decode()}")


def on_new_ldr(client, userdata, message):
    # print(f"[-] new ldr data {message.payload.decode()}")
    pass


def on_device_list(client, userdata, message):
    print(f"[-] new request for device list")

    response_topic = message.properties.ResponseTopic

    properties = Properties(PacketTypes.PUBLISH)
    properties.CorrelationData = message.properties.CorrelationData

    print(f"[-] responding on topic {response_topic}")

    client.publish(response_topic, json.dumps(data.devices))


def on_device_reserve(client, userdata, message):
    pass
