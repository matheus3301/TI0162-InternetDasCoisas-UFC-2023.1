import paho.mqtt.client as mqtt
import handle
import time
import commands

NOTIFICATION_TIME = 2

BROKER_HOST = "mosquitto"
BROKER_PORT = 1883

LDR_TOPIC = "sensors/+/ldr"
TEMPERATURE_TOPIC = "sensors/+/temperature"
PRESENCE_TOPIC = "sensors/+/presence"

DEVICE_LIST_TOPIC = "devices"
DEVICE_RESERVE_TOPIC = "devices/+/reserve"

client = mqtt.Client("worker")
client.connect(BROKER_HOST, BROKER_PORT)

client.on_publish = handle.on_publish
client.on_message = handle.on_message

client.message_callback_add(LDR_TOPIC, handle.on_new_ldr)
client.message_callback_add(PRESENCE_TOPIC, handle.on_new_presence)
client.message_callback_add(TEMPERATURE_TOPIC, handle.on_new_temperature)

client.message_callback_add(DEVICE_LIST_TOPIC, handle.on_device_list)
client.message_callback_add(DEVICE_RESERVE_TOPIC, handle.on_device_reserve)


client.subscribe(LDR_TOPIC)
client.subscribe(TEMPERATURE_TOPIC)
client.subscribe(PRESENCE_TOPIC)
client.subscribe(DEVICE_LIST_TOPIC)
client.subscribe(DEVICE_RESERVE_TOPIC)


client.loop_start()
while True:
    try:
        while True:
            commands.send_notifications(client)
            time.sleep(NOTIFICATION_TIME)
    except Exception:
        pass
client.loop_stop()
