import os
import io
import json
#Imports google cloud client library
#import google.cloud
from google.cloud import vision
from google.cloud.vision import types

class ImageSceneContext:
    def __init__(self, disaster):
        self.disaster_type = disaster
        return

    def get_scene_context(self):
        # Instantiates a client
        client = vision.ImageAnnotatorClient()

        all_labels = {}

        filename = 'severe_2.png'
        corpus_file_name = 'severe_2.txt'
        # Loads the image into memory
        with io.open(filename, 'rb') as image_file:
            content = image_file.read()

        image = types.Image(content=content)

        # Performs label detection on the image file
        response = client.label_detection(image=image)
        labels = response.label_annotations
        for label in labels:
            label_type = label.description.strip()
            all_labels[label_type] = label.score

        s = [(k, all_labels[k]) for k in sorted(all_labels, key=all_labels.get, reverse=True)]
        with open(corpus_file_name, 'w') as file:
            file.write(json.dumps(s))
        
        # Ideally run the image through a classifier, but for now assume text file
        if self.disaster_type == "forest_fire":
            s = open('corpus/forest_fire_words.txt', 'r').read()
        elif self.disaster_type == "avalanche":
            s = open('corpus/avalanche_words.txt', 'r').read()
        elif self.disaster_type == "flood":
            s = open('corpus/flood_words.txt', 'r').read()
        else:
            return None
        # Ideally run the image through a classifier, but for now assume text file
        s = open('corpus/forest_fire_words.txt', 'r').read()
        top_words = eval(s)
        top_words = dict(top_words)
        count_words = 0
        for key, value in top_words.items():
            count_words += value
        for key, value in top_words.items():
            top_words[key] = top_words[key] / count_words
        s = open(corpus_file_name, 'r').read()
        img = eval(s)
        img = dict(img)
        score = 0
        for key, value in img.items():
            score += value * top_words[key]
        return((1/score)*2)

def main(): 
    scene_context = ImageSceneContext("forest_fire")
    print(scene_context.get_scene_context())
    return

if __name__ == "__main__":
    main()
