import paho.mqtt.client as mqtt

def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")
    pass

broker = "localhost"
broker_port = 1883

client = mqtt.Client("commander")
client.connect(broker, broker_port)

client.on_publish = on_publish


while True:
    command = input("command: ")

    client.publish("ps-01/commands",command)