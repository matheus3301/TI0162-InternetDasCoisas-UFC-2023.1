import paho.mqtt.client as mqtt

broker = "localhost"
broker_port = 1883

# Topics
distance = "ps-01/sensors/distance"
ldr = "ps-01/sensors/ldr"
temperature = "ps-01/sensors/temperature"

# Define function for handling messages
def on_message(client, userdata, message):
    if message.topic == temperature:
        print("Novo valor de temperatura: {}".format(message.payload.decode()))
    elif message.topic == ldr:
        print("Novo valor de ldr: {}".format(message.payload.decode()))
    elif message.topic == distance:
        print("Novo valor de distancia: {}".format(message.payload.decode()))

# Create MQTT client
client = mqtt.Client()

# Handling incoming messages
client.on_message = on_message

# Connect to broker
client.connect(broker, broker_port)

# Subscribe to topics
client.subscribe(distance)
client.subscribe(ldr)
client.subscribe(temperature)

# Start MQTT network loop to process incoming messages
client.loop_forever()
