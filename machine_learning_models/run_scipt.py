"""
Katherine Bancroft

Hack the Globe
2019-03-17
"""

import requests
from testClassifier import run_model_on_one_image
from imageSceneContext import ImageSceneContext

class ProcessImages(object):

    def _get_raw_data(self):
        return requests.get(
                'http://localhost:8888/reports/get_all_raw_image',
            )
        
    
    def _update_raw_data(self, message):
        message['processed'] = True
        requests.post(
            'http://localhost:8888/reports/update_raw_data',
            data=message
        )

    def process_and_send_image_data(self):  
        raw_image_data = self._get_raw_data()
        for image_content in raw_image_data.json():
            print('CONTENT', image_content)
            self._update_raw_data(image_content)
            filename = self._download_image_locally(image_content['image'])
            disaster_type_prediction = run_model_on_one_image(filename)
            severity_prediction = self._get_image_scene_prediction(filename, disaster_type_prediction)
            processed_image = self._construct_good_message(image_content, disaster_type_prediction)
            self._post_to_processed_db(processed_image)
    
    def _post_to_processed_db(self, message):
        requests.post(
            'http://localhost:8888/reports/create_good_report',
            data=message
        )
        
    def _construct_good_message(self, message, disaster_type_prediction, severity_prediction):
        message['disaster'] = disaster_type_prediction
        message['severity'] = severity_prediction
        return message
    
    def _download_image_locally(self, message_url):
        import urllib.request
        from uuid import uuid4
        file_name = str(uuid4())+'.jpg'

        urllib.request.urlretrieve(message_url, file_name)
        return file_name
    
    def _get_image_scene_prediction(self, filename, disaster_type):
        image_scene_context = ImageSceneContext(disaster_type)
        return image_scene_context.get_scene_context(filename)


class ProcessTweets(object):
        
    def _get_raw_data(self):
        return requests.get(
                'http://localhost:8888/reports/get_all_raw_tweet',
            )
    
    def _update_raw_data(self, message):
        message['processed'] = True
        requests.post(
            'http://localhost:8888/reports/update_raw_data',
            data=message
        )

    def process_and_send_image_data(self):  
        raw_tweet_data = self._get_raw_data()

        for tweet in raw_tweet_data.json():
            if type(tweet) == dict:
                self._update_raw_data(tweet)
                self._post_to_processed_db(tweet)
    
    def _post_to_processed_db(self, message):
        requests.post(
            'http://localhost:8888/reports/create_good_report',
            data=message
        )


        
image_processor = ProcessImages()
image_processor.process_and_send_image_data()

tweet_processor = ProcessTweets()
tweet_processor.process_and_send_image_data()