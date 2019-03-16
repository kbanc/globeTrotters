"""
Katherine Bancroft 2019-03-17
Hack the Globe

Script to run RT Kafka 
"""
import os
import sys
my_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(os.path.join(my_path, "../kafka_streaming"))

from .consumer import Consumer
from .producer import Producer

run_consumer()
run_producer()


def run_consumer():
    consumer = Consumer().subscribe('naturaldisaster')
    consumer.send_data_to_api()

def run_producer():

    access_token = "1633719781-e035OTEcEkiCFD2FzP7Kymsig4gVsSnyXmzKAqz"
    access_token_secret = "ejlLIysq37M4BNdSOehF0DeNqh5rXavHloOHxPsGpVyOV" 
    consumer_key =  "wlowJoiOGQCmzQPlAvkXjFDK7"
    consumer_secret =  "8LcVYjHoT2jfbtYYGgOCml3bbSzcwAGjvlEBpc27Qw44aZZIhi"

    from kafka import SimpleProducer, KafkaClient
    from tweepy import OAuthHandler
    from tweepy import Stream

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
