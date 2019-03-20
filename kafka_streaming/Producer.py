"""
Katherine Bancroft 2019-03-17
Hack the Globe

Code from https://www.bmc.com/blogs/working-streaming-twitter-data-using-kafka
"""

from tweepy.streaming import StreamListener

class Producer(StreamListener):
    
    def __init__(self, topic, producer):
        self._topic = topic
        self._producer = producer

    def on_data(self, data):
        self._producer.send_messages(self._topic, data.encode('utf-8'))
        return True
    
    def on_status(self, status):
        print(status.text)

    def on_error(self, status):
        if status == 420:
            return False

def run_producer():

    access_token = ""
    access_token_secret = "" 
    consumer_key =  ""
    consumer_secret =  ""

    from kafka import SimpleProducer, KafkaClient
    from tweepy import OAuthHandler
    from tweepy import Streame035OTEcEkiCFD2FzP7Kymsig4gVsSnyXmzKAqz

    kafka = KafkaClient("localhost:9092")
    listener = Producer('naturaldisaster', SimpleProducer(kafka))

    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    stream = Stream(auth, listener)
    stream.filter(track=[
        "natural disaster", 
        'flood',
        'fire',
        'avalanche',
        'wildfire',
        'forest fire'])#streams all tweets containing 'naturaldisaster' - this may not be tracking correctly

run_producer()
