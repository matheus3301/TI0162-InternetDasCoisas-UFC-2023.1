def on_message(client, userdata, message):
    print(message.payload.decode())

import paho.mqtt.client as mqtt

broker = "192.168.0.5"
broker_port = 9001

client = mqtt.Client(transport="websockets")

# Handling incoming messages
client.on_message = on_message

# Connect to broker
client.connect(broker, broker_port)

# Subscribe to topics
client.subscribe("notifications")

# Start MQTT network loop to process incoming messages
client.loop_forever()

    