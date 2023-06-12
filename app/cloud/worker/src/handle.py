import util
import data
import json
import commands

from paho.mqtt.properties import Properties
from paho.mqtt.packettypes import PacketTypes


def on_publish(client, userdata, result):
    print("[-] message sent")


def on_message(client, userdata, message):
    # print(f"[-] new sensor data on topic {message.topic}")
    pass


def on_new_temperature(client, userdata, message):
    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()

    data.devices[device_id]['temperature'] = raw_data

    print(f"[-] new temperature data of {raw_data}º for {device_id}")


def on_new_ldr(client, userdata, message):
    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()

    data.devices[device_id]['luminosity'] = raw_data

    print(f"[-] new luminosity data of {raw_data} for {device_id}")


def on_new_presence(client, userdata, message):
    device_id = util.get_device_id(message)
    raw_data = message.payload.decode()

    isOcuppied = True if raw_data == '1' else False

    data.devices[device_id]["isOcuppied"] = isOcuppied

    print(
        f"[-] setting {device_id} as {'not ' if not isOcuppied else ''}occupied"
    )

    if isOcuppied:

        if data.devices[device_id]['requestedBy'] is None:
            print(f"[-] {device_id} ocuppied incorrectly")

            commands.send_command(client, device_id, '2')

        else:
            # TODO: check if the person who occupied is correct
            print(f"[-] {device_id} ocuppied correcty")

            commands.send_command(client, device_id, '3')

    else:
        if data.devices[device_id]['requestedBy'] is None:
            print(f"[-] {device_id} is free")

            commands.send_command(client, device_id, '0')

        else:
            print(f"[-] {device_id} is reserved")

            commands.send_command(client, device_id, '1')


def on_device_list(client, userdata, message):
    print(f"[-] new request for device list")

    response_topic = message.properties.ResponseTopic

    properties = Properties(PacketTypes.PUBLISH)
    properties.CorrelationData = message.properties.CorrelationData

    print(f"[-] responding on topic {response_topic}")

    client.publish(response_topic, json.dumps(data.devices))


def on_device_reserve(client, userdata, message):
    # TODO: Finish this
    # device_id = util.get_device_id(message)
    # raw_data = message.payload.decode()

    # response_topic = message.properties.ResponseTopic

    # properties = Properties(PacketTypes.PUBLISH)
    # properties.CorrelationData = message.properties.CorrelationData

    pass
