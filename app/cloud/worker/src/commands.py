import data
import json

NOTIFICATION_TOPIC = "notifications"

def ask_occupation(client, device_id):
    client.publish(f"device/{device_id}/ask", data.devices[device_id]['requestedBy'])


def send_command(client, device_id, command):
    client.publish(f"commands/{device_id}", command)


def send_notifications(client):
    content = []
    for device_id in data.devices:
        content.append({
            'deviceName': device_id,
            'name': data.devices[device_id]['name'],
            'location': data.devices[device_id]['location'],
            'requestedBy': data.devices[device_id]['requestedBy'],
            'isOcuppied': data.devices[device_id]['isOcuppied'],
            'ocuppiedProperly': data.devices[device_id]['ocuppiedProperly'],
            'luminosity': data.devices[device_id]['luminosity'],
            'temperature': data.devices[device_id]['temperature'],
        })

    client.publish(NOTIFICATION_TOPIC, json.dumps(content))


def update_device_status(client, device_id):
    if data.devices[device_id]['isOcuppied']:

        if data.devices[device_id]['requestedBy'] is None or not data.devices[device_id]['ocuppiedProperly']:
            print(f"[-] {device_id} ocuppied incorrectly")

            send_command(client, device_id, '2')

        else:
            # TODO: check if the person who occupied is correct
            print(f"[-] {device_id} ocuppied correcty")

            send_command(client, device_id, '3')

    else:
        if data.devices[device_id]['requestedBy'] is None:
            print(f"[-] {device_id} is free")

            send_command(client, device_id, '0')

        else:
            print(f"[-] {device_id} is reserved")

            send_command(client, device_id, '1')
