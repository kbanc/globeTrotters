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
        print(data)
        self._producer.send_messages(self._topic, data.encode('utf-8'))
        return True
    
    def on_status(self, status):
        print(status.text)

    def on_error(self, status):
        if status == 420:
            return False