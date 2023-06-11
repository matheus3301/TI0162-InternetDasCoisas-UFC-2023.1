import paho.mqtt.client as mqtt
import handle

BROKER_HOST = "mosquitto"
BROKER_PORT = 1883

LDR_TOPIC = "sensors/+/ldr"
TEMPERATURE_TOPIC = "sensors/+/temperature"
PRESENCE_TOPIC = "sensors/+/presence"


client = mqtt.Client("worker")
client.connect(BROKER_HOST, BROKER_PORT)

client.on_publish = handle.on_publish
client.on_message = handle.on_message

client.message_callback_add(LDR_TOPIC, handle.on_new_ldr)
client.message_callback_add(PRESENCE_TOPIC, handle.on_new_presence)
client.message_callback_add(TEMPERATURE_TOPIC, handle.on_new_temperature)

client.subscribe(LDR_TOPIC)
client.subscribe(TEMPERATURE_TOPIC)
client.subscribe(PRESENCE_TOPIC)

client.loop_forever()
