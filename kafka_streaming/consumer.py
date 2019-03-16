"""
Katherine Bancroft 2019-03-17
Hack the Globe

Takes data from KafkaConsumer and pushes to mongoDB
"""
import requests
from kafka import KafkaConsumer
from json import loads


class Consumer(object):

    def __init__(self):
        self._consumer = KafkaConsumer(
            bootstrap_servers=['localhost:9092'],
            value_deserializer=lambda x: loads(x.decode('utf-8')
            )
        )
        
    def subscribe(self, topic):
        print('consumer is subsribed')
        self._consumer.subscribe(topic)
        return self
    
    def get_subscriptors(self):
        return self._consumer.subscription()
    
    def send_data_to_api(self): 
        for message in self._consumer:
            message = self._convert_message_to_db_form(message.value)
            post_request = self._post_to_api(message)
             
    def _post_to_api(self, message):
        return requests.post(
                'http://localhost:8888/reports/create_raw_report',
                data=message
            )
    
    def _convert_message_to_db_form(self, raw_message):
        coordinates = raw_message.get('coordinates', None)
        place = raw_message.get('place', None)
        longitude, latitude, location_name = None, None, None

        if coordinates:
            longitude, latitude = coordinates
        
        if place:
            location_name = place['name']

        formatted_message = {
            'tweet': raw_message['text'],
            'longitude': longitude,
            'latitude': latitude,
            'location': location_name,
            'date': raw_message['created_at'],
            'datatype':     'tweet'
        }


        return formatted_message

def run_consumer():
    consumer = Consumer().subscribe('naturaldisaster')
    consumer.send_data_to_api()

run_consumer()


        