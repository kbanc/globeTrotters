import os
import io

#Imports google cloud client library
#import google.cloud
from google.cloud import vision
from google.cloud.vision import types

# Instantiates a client
client = vision.ImageAnnotatorClient()

file_name = 'download.jpg'
with io.open(file_name,'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

# Performs label detection on the image file
response = client.label_detection(image=image)
labels = response.label_annotations

for label in labels:
    print(label.description)


# os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="client_secrets.json"
# client = vision.ImageAnnotatorClient()
#if __name__ == '__main__':
 #   run_quickstart()