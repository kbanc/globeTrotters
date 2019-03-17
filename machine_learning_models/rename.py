import os

if __name__ == "__main__":
    term = "avalanche"
    count = 0
    directory = 'avalanche/'
    for filename in os.listdir(directory):    
        os.rename(directory + filename, directory + term + "_" + str(count) + ".png")
        count += 1