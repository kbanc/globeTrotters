"""
Katherine Bancroft 2019-03-17
Hack the Globe

Code from https://www.bmc.com/blogs/working-streaming-twitter-data-using-kafka/
"""

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from kafka import SimpleProducer, KafkaClient

access_token = "1633719781-e035OTEcEkiCFD2FzP7Kymsig4gVsSnyXmzKAqz"
access_token_secret = "ejlLIysq37M4BNdSOehF0DeNqh5rXavHloOHxPsGpVyOV" 
consumer_key =  "wlowJoiOGQCmzQPlAvkXjFDK7"
consumer_secret =  "8LcVYjHoT2jfbtYYGgOCml3bbSzcwAGjvlEBpc27Qw44aZZIhi"

class KafkaListener(StreamListener):
    def on_data(self, data):
        producer.send_messages("naturaldisaster", data.encode('utf-8'))
        print (data)
        return True
    def on_error(self, status):
        print (status)

kafka = KafkaClient("localhost:9092")
producer = SimpleProducer(kafka)
l = KafkaListener()
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
stream = Stream(auth, l)
stream.filter(track="naturaldisaster")