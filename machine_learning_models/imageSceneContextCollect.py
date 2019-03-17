import os
import io
import json
#Imports google cloud client library
#import google.cloud
from google.cloud import vision
from google.cloud.vision import types

# Instantiates a client
client = vision.ImageAnnotatorClient()

all_labels = {}

directory = 'forest_fire/'
for filename in os.listdir(directory):    
    try:
        # Loads the image into memory
        with io.open(directory + filename, 'rb') as image_file:
            content = image_file.read()

        image = types.Image(content=content)

        # Performs label detection on the image file
        response = client.label_detection(image=image)
        labels = response.label_annotations

        for label in labels:
            label_type = label.description.strip()
            if label_type not in all_labels:
                all_labels[label_type] = 0
            else:
                all_labels[label_type] += 1
    except:
        continue

s = [(k, all_labels[k]) for k in sorted(all_labels, key=all_labels.get, reverse=True)]
with open('corpus/forest_fire_words.txt', 'w') as file:
     file.write(json.dumps(s))