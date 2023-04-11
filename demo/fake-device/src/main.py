import os

from sensor import Sensor
from dotenv import load_dotenv

load_dotenv()

sensor = Sensor(
    'data.csv',
    5,
    'mqtt.tago.io',
    1883,
    'Token',
    os.environ['TOKEN']
)
