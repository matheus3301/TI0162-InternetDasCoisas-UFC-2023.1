import data
import json

NOTIFICATION_TOPIC = "notifications"


def send_command(client, device_id, command):
    client.publish(f"commands/{device_id}", command)


def send_notifications(client):
    client.publish(NOTIFICATION_TOPIC, json.dumps(data.devices))


def update_device_status(client, device_id):
    if data.devices[device_id]['isOcuppied']:

        if data.devices[device_id]['requestedBy'] is None:
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
