import util
import data
import json
import commands

from paho.mqtt.properties import Properties
from paho.mqtt.packettypes import PacketTypes


def on_publish(client, userdata, result):
    # print("[-] message sent")
    pass


def on_message(client, userdata, message):
    # print(f"[-] new sensor data on topic {message.topic}")
    pass


def on_new_temperature(client, userdata, message):
    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()

    data.devices[device_id]['temperature'] = raw_data

    # print(f"[-] new temperature data of {raw_data}º for {device_id}")


def on_new_ldr(client, userdata, message):
    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()

    data.devices[device_id]['luminosity'] = raw_data

    # print(f"[-] new luminosity data of {raw_data} for {device_id}")


def on_new_presence(client, userdata, message):
    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()

    isOcuppied = True if raw_data == '1' else False

    data.devices[device_id]["isOcuppied"] = isOcuppied

    print(
        f"[-] setting {device_id} as {'not ' if not isOcuppied else ''}occupied"
    )

    commands.update_device_status(client, device_id)


def on_device_reserve(client, userdata, message):

    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()


    print(f"[-] user {raw_data} trying to reserve device {device_id}")
    # response_topic = message.properties.ResponseTopic
    # properties = Properties(PacketTypes.PUBLISH)
    # properties.CorrelationData = message.properties.CorrelationData

    if data.devices[device_id]['requestedBy'] is None:
        data.devices[device_id]['requestedBy'] = raw_data
    elif data.devices[device_id]['requestedBy'] == raw_data:
        data.devices[device_id]['requestedBy'] = None

    commands.update_device_status(client, device_id)

    # client.publish(response_topic, data.devices[device_id]['requestedBy'])
