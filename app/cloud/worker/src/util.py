def get_device_id(topic: str) -> str:
    return topic.split("/")[1]
