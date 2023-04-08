import os
import pandas as pd

from dotenv import load_dotenv
from tagoio_sdk import Analysis, Device
from joblib import load

load_dotenv()

classifier = load('model.joblib')

device = Device({
    'token': os.environ['DEVICE_TOKEN']
})


def analysis(context, scope: list) -> None:
    variables = device.getData({
        'query': 'last_item',
        'variables': ['x', 'y', 'z', '010000024033', '010000030096', '020000032221', '020000033111']
    })

    data = {}
    for variable in variables:
        data[variable['variable']] = [variable['value']]

    X = pd.DataFrame.from_dict(data)

    y = classifier.predict(X)
    if y[0] == 1.:
        print("Fall detected! Sending message to contact")

    device.sendData({
        'variable': 'anomaly',
        'value': y[0]
    })


Analysis({"token": os.environ['ANALYSIS_TOKEN']}).init(analysis)
