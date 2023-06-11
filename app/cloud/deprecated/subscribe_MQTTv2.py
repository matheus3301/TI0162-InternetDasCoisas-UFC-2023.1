import paho.mqtt.client as mqtt
import matplotlib.pyplot as plt
import numpy as np

broker = "localhost"
broker_port = 1883

# Topics
distance = "ps-01/sensors/distance"
ldr = "ps-01/sensors/ldr"
temperature = "ps-01/sensors/temperature"

temp_data = []
ldr_data = []
dist_data = []

# Define function for handling messages
def on_message(client, userdata, message):
    if message.topic == temperature:
        temp_data.append(float(message.payload.decode()))
    elif message.topic == ldr:
        ldr_data.append(float(message.payload.decode()))
    elif message.topic == distance:
        dist_data.append(float(message.payload.decode()))

# Create MQTT client
client = mqtt.Client()

# Setting the function for handling incoming messages
client.on_message = on_message

# Connect to broker
client.connect(broker, broker_port)

# Subscribe to topics
client.subscribe(distance)
client.subscribe(ldr)
client.subscribe(temperature)

# Start MQTT network loop to process incoming messages
client.loop_start()


fig, axs = plt.subplots(3, 1)

while True:
    if len(temp_data) > 0 and len(ldr_data) > 0 and len(dist_data) > 0:
        axs[0].plot(temp_data, color="red")
        axs[0].set_title('Temperatura')
        axs[1].plot(ldr_data, color="green")
        axs[1].set_title('LDR')
        axs[2].plot(dist_data, color="blue")
        axs[2].set_title('Distância')
        plt.tight_layout()
        plt.draw()
        plt.pause(0.1)
