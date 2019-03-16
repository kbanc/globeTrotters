import os
import io
import google.cloud
from google.cloud import vision
vision_client = vision.Client()
file_name = 'download.jpg'
with io.open(file_name,'rb') as image_file:
    content = image_file.read()
    image = vision_client.image(content=content)

labels = image.detect_labels()

for label in labels:
    print(label.description)


# os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="client_secrets.json"
# client = vision.ImageAnnotatorClient()
