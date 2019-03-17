from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from keras.models import load_model
from tensorflow.keras.layers import Dense, Activation, Flatten, Dropout
from tensorflow.keras.models import Sequential, Model
import cv2
import numpy as np
import os 

def build_finetune_model(base_model, dropout, fc_layers, num_classes):
    HEIGHT = 300
    WIDTH = 300
    BATCH_SIZE = 32
    base_model = ResNet50(weights='imagenet', 
                      include_top=False, 
                      input_shape=(HEIGHT, WIDTH, 3))
    for layer in base_model.layers:
        layer.trainable = False

    x = base_model.output
    x = Flatten()(x)
    for fc in fc_layers:
        # New FC layer, random init
        x = Dense(fc, activation='relu')(x) 
        x = Dropout(dropout)(x)

    # New softmax layer
    predictions = Dense(num_classes, activation='softmax')(x) 
    
    finetune_model = Model(inputs=base_model.input, outputs=predictions)

    return finetune_model

def load_trained_model():
    HEIGHT = 300
    WIDTH = 300
    BATCH_SIZE = 32
    class_list = ["avalanche", "flood", "forrest_fire"]
    FC_LAYERS = [1024, 1024]
    dropout = 0.5
    base_model = ResNet50(weights='imagenet', 
                      include_top=False, 
                      input_shape=(HEIGHT, WIDTH, 3))
    finetune_model = build_finetune_model(base_model, 
                                          dropout=dropout, 
                                          fc_layers=FC_LAYERS, 
                                          num_classes=len(class_list))
    finetune_model.load_weights('transfer_learning_model.h5')
    return finetune_model

def model_predict(image_path, model, filename):
    class_list = ["avalanche", "flood", "fire"]
    im = cv2.imread(image_path)
    resized_image = cv2.resize(im, (300, 300)) 
    tr_img_data = np.expand_dims(resized_image, axis=0) 
    prediction = model.predict(tr_img_data)
    print(class_list[np.argmax(prediction)])
    if(class_list[np.argmax(prediction)] == filename.split('_', 1)[0]):
        return True
    return False

def test_model():
    model = load_trained_model()
    count = 0
    filename_count = 0
    directory = 'test/'
    for filename in os.listdir(directory):
        if filename == '.DS_Store':
            continue
        filename_count += 1
        if model_predict(directory + filename, model, filename):
            count += 1
    print("Model accuracy is :" + str(count / filename_count))

if __name__ == "__main__":
    test_model()