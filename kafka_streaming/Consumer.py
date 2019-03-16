"""
Katherine Bancroft 2019-03-17
Hack the Globe

Takes data from KafkaConsumer and pushes to mongoDB
"""
from kafka import KafkaConsumer
from pymongo import MongoClient
from json import loads

class Consumer(self):
    def __init__(self):
        self._consumer = KafkaConsumer(
            bootstrap_servers=['localhost:9092'],
            value_deserializer=lambda x: loads(x.decode('utf-8')
            )
        self._client = MongoClient('localhost:27017')
        
    def subscribe(self, topic):
        self._consumer.subscribe(topic)
        return self
    
    def send_data_to_db(self):
        collection = self._client.twitter_data
        for message in self._consumer:
            message = self._convert_message_to_db_form(message.value)
            collection.insert_one(message)
            print('{} added to {}'.format(message, collection))
    
    def _convert_message_to_db_form(self, raw_message):
        coordinates = raw_message.get('coordinates', None)
        if coordinates:
            longitude, latitude = coordinates
        formatted_message = {}
        formatted_message['tweet'] = raw_message['text']
        formatted_message['metadata'] = {
            'logitude': longitude
            'latitude': latitude
            'date': raw_message['created_at']
        }
        formatted_message['datatype'] = 'tweet'

        return formatted_message

consumer = Consumer().subscribe('naturaldisaster')
consumer.send_data_to_db()


        