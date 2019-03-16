"""
Katherine Bancroft 2019-03-17
Hack the Globe

Code from https://www.bmc.com/blogs/working-streaming-twitter-data-using-kafka
"""

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from kafka import SimpleProducer, KafkaClient

access_token = "1633719781-e035OTEcEkiCFD2FzP7Kymsig4gVsSnyXmzKAqz"
access_token_secret = "ejlLIysq37M4BNdSOehF0DeNqh5rXavHloOHxPsGpVyOV" 
consumer_key =  "wlowJoiOGQCmzQPlAvkXjFDK7"
consumer_secret =  "8LcVYjHoT2jfbtYYGgOCml3bbSzcwAGjvlEBpc27Qw44aZZIhi"

class Producer(StreamListener):
    def __init__(self, topic, producer):
        self._topic = topic
        self._producer = producer

    def on_data(self, data):
        print(data)
        self._producer.send_messages(self._topic, data.encode('utf-8'))
        return True
    
    def on_status(self, status):
        print(status.text)

    def on_error(self, status):
        if status == 420:
            return False

kafka = KafkaClient("localhost:9092")
listener = Producer('naturaldisaster', SimpleProducer(kafka))

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

stream = Stream(auth, listener)
stream.filter(track=[
    "natural disaster", 
    'hurricane',
    'tornado',
    'flood',
    'fire',
    'earthquake',
    'tsunami'])#streams all tweets containing 'naturaldisaster' - this may not be tracking correctly