def send_command(client, device_id, command):
    client.publish(f"commands/{device_id}", command)
