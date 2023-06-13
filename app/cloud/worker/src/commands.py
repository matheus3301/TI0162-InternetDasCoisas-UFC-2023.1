import data
import json

NOTIFICATION_TOPIC = "notifications"


def send_command(client, device_id, command):
    client.publish(f"commands/{device_id}", command)


def send_notifications(client):
    client.publish(NOTIFICATION_TOPIC, json.dumps(data.devices))
