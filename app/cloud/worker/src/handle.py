def on_publish(client, userdata, result):
    print("[-] message sent")


def on_message(client, userdata, message):
    # print(f"[-] new sensor data on topic {message.topic}")
    pass


def on_new_temperature(client, userdata, message):
    # print(f"[-] new temperature data {message.payload.decode()}")
    pass


def on_new_presence(client, userdata, message):
    print(f"[-] new presence data {message.payload.decode()}")


def on_new_ldr(client, userdata, message):
    # print(f"[-] new ldr data {message.payload.decode()}")
    pass
