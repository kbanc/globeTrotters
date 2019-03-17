# import the necessary packages
from requests import exceptions
import argparse
import requests
import cv2
import os
from random import randint

with open('data/words.txt') as f:
    content = f.readlines()
num_words = len(content)

# maximum number of results for a given search and (2) the group size
# for results (maximum of 50 per request)
API_KEY = "47500502d0d8446c82b6c2adec6db5b7"
 
# set the endpoint API URL
URL = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"

headers = {"Ocp-Apim-Subscription-Key" : API_KEY}

for i in range(0,1000):
    random_word_num = randint(0, num_words)
    term = content[random_word_num].strip()
    params = {"q": term, "offset": 0, "count": 1}

    # make the search
    print("[INFO] searching Bing API for '{}'".format(term))
    search = requests.get(URL, headers=headers, params=params)
    search.raise_for_status()

    # grab the results from the search, including the total number of
    # estimated results returned by the Bing API
    results = search.json()
    try:
        url = results["value"][0]["contentUrl"]
        r = requests.get(url, timeout=30)

        p = 'data/random/' + str(i) + ".png"
        f = open(p, "wb")
        f.write(r.content)
        f.close()
    except:
        pass