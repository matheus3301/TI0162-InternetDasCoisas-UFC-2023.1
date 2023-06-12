def get_device_id(message) -> str:
    return message.topic.split("/")[1]
