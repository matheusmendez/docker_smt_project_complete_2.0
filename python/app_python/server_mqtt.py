import paho.mqtt.client as mqtt
import pytz
from datetime import datetime
import os
from database import *
#from mysql_backup import *
#from dotenv import load_dotenv

#load_dotenv()

HOST = os.getenv('_HOST_MQTT') 
PORT = int(os.getenv('_PORT_MQTT'))
TOPIC = os.getenv('_TOPIC')
print(f"HOST:{HOST}")
print(f"PORT:{PORT}")
print(f"TOPIC:{TOPIC}")


def on_connect(client, userdata, flags, rc):
    print(f'Connected with result code {rc}')
    # Subscribe (or renew if reconnect).
    client.subscribe(TOPIC)


def on_message(client, userdata, msg):
    value = eval(msg.payload.decode('utf-8'))
    value['date_time'] = datetime.now(tz=pytz.timezone('America/Manaus')).strftime('%Y%m%d%H%M%S')
    insert_values(tuple(value.values()))
    print(value)
    # check_last_backup()

client = mqtt.Client(
    client_id='server_mqtt.py'
)
# Client(client_id="", clean_session=True, userdata=None, protocol=MQTTv311, transport="tcp")
client.on_connect = on_connect   # Specify on_connect callback
client.on_message = on_message   # Specify on_message callback
client.connect(host=HOST, port=PORT, keepalive=60)
# Processes MQTT network traffic, callbacks and reconnections. (Blocking)
client.loop_forever()