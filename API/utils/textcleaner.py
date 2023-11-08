import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import preprocessor as p
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer, PorterStemmer
import nltk
import re
import string
import inflect
from tqdm import tqdm

# nltk.download('stopwords')

# nltk.download('wordnet')

# nltk.download('punkt')

# nltk.download('averaged_perceptron_tagger')
def remove_punct(text):
    text  = "".join([char for char in text if char not in string.punctuation])
    text = re.sub('[0-9]+', '', text)
    return text

def cleanText(txt):
    txt = p.clean(txt)
    txt = remove_punct(txt).lower()
    return txt

def remove_stopwords(text):
    text = [word for word in text if word not in stopwords.words('english')]
    return text

def lemmatization(text):
    # Lemmatization - From plural to single + Base form of a word (example better-> good) with WordNetLemmatizer
    lemmatizer = WordNetLemmatizer()
    text = [lemmatizer.lemmatize(word) for word in text]
    return text

def steamming(text):
    # Stemming (example: beautiful -> beauty) with PorterStemmer
    stemmer = PorterStemmer()
    text = " ".join([stemmer.stem(word) for word in text])
    return text

def numeric_to_words(text):
    # Initialize inflect engine
    p = inflect.engine()
    
    #replace numbers with words, CONVERT NUMERALS INTO ORDINALS
    text = [p.number_to_words(word) if word.isdigit() else word for word in text]

    #remove ordinal numbers
    text = [word for word in text if not word.isdigit()]
    return text

def clean_text(text):
    #replace <br> with breakline and remove other html tags
    text = text.replace("<br />", " ")
    text = cleanText(text)
    text = text.split()
    text = remove_stopwords(text)
    text = lemmatization(text)
    text = numeric_to_words(text)
    text = ' '.join(text)
    return text
