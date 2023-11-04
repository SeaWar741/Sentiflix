# Create Flask app
import json
import pandas as pd
import numpy as np
import certifi
import jwt
import datetime
from bson import ObjectId
from functools import wraps
import simplejson
from joblib import load

import hashlib, binascii, os

from flask import Flask, jsonify, request

from flask_cors import CORS, cross_origin

from utils.textcleaner import clean_text
import http.client
import bardapi

from dotenv import load_dotenv
from sklearn.feature_extraction.text import CountVectorizer
import os
import pickle
from collections import Counter

# Load the .env file
load_dotenv()

# Now you can access the variables using os.getenv
omdb_key = os.getenv("omdb_key")
tmdb_authorization_header = os.getenv("tmdb_authorization_header")
token = os.getenv("token")


app = Flask(__name__)



conn = http.client.HTTPSConnection("api.themoviedb.org")

@app.route('/api', methods=['GET'])
@cross_origin()
def api():
    return jsonify({'result': 'Hello, World!'})

@app.route('/api/trending', methods=['GET'])
@cross_origin()
def trending():
    headers = {
        'Authorization': 'Bearer ' + tmdb_authorization_header,
        'accept': 'application/json'
    }
    conn.request("GET", "/3/trending/movie/day", headers=headers)
    res = conn.getresponse()
    #save the json response in variable
    data = res.read()
    #for altt the backdrop_path append the base url
    data = json.loads(data)
    for movie in data["results"]:
        if movie["backdrop_path"]:
            movie["backdrop_path"] = "https://image.tmdb.org/t/p/original" + movie["backdrop_path"]
        if movie["poster_path"]:
            movie["poster_path"] = "https://image.tmdb.org/t/p/original" + movie["poster_path"]

    
    return data, 200


@app.route('/api/search/<movie_name>', methods=['GET'])
@cross_origin()
def search(movie_name):
    #movie name to string

    #replace _ with %20
    movie_name = movie_name.replace("_", "%20")
    #set to lowercase
    movie_name = movie_name.lower()


    headers = {
        'Authorization': 'Bearer ' + tmdb_authorization_header,
        'accept': 'application/json'
    }
    conn.request("GET", "/3/search/movie?query=" + movie_name +"&include_adult=false&language=en-US&page=1'", headers=headers)
    res = conn.getresponse()
    data = res.read()
    #for altt the backdrop_path append the base url
    data = json.loads(data)
    for movie in data["results"]:
        if movie["backdrop_path"]:
            movie["backdrop_path"] = "https://image.tmdb.org/t/p/original" + movie["backdrop_path"]
        if movie["poster_path"]:
            movie["poster_path"] = "https://image.tmdb.org/t/p/original" + movie["poster_path"]
    
    # Split the search term into words and create a counter for them
    search_words = Counter(movie_name.lower().split())

    # First, find if there is an exact match
    exact_matches = [movie for movie in data["results"] if movie["original_title"].lower() == movie_name.lower()]
    # Remove exact matches from the original list
    data["results"] = [movie for movie in data["results"] if movie not in exact_matches]

    def sort_key(movie):
        title_words = Counter(movie["original_title"].lower().split())
        # Count how many search words are in the movie title
        match_count = sum((title_words & search_words).values())
        # Return a tuple that will sort by match count, then alphabetically
        return (-match_count, movie["original_title"].lower())

    # Sort the movies based on the custom sort key
    data["results"].sort(key=sort_key)

    # Prepend the exact matches to the sorted list
    data["results"] = exact_matches + data["results"]

    # remove movies with no backdrop
    data["results"] = [movie for movie in data["results"] if movie["backdrop_path"]]

    return data, 200

@app.route('/api/movie/<movie_id>', methods=['GET'])
@cross_origin()
def movie(movie_id):
    headers = {
        'Authorization': 'Bearer ' + tmdb_authorization_header,
        'accept': 'application/json'
    }
    conn.request("GET", "/3/movie/" + movie_id + "?append_to_response=reviews", headers=headers)
    res = conn.getresponse()
    data = res.read()
    #for the backdrop_path append the base url
    data = json.loads(data)
    data["backdrop_path"] = "https://image.tmdb.org/t/p/original" + data["backdrop_path"]
    data["poster_path"] = "https://image.tmdb.org/t/p/original" + data["poster_path"]
    #production companies logos
    for company in data["production_companies"]:
        if company["logo_path"]:
            company["logo_path"] = "https://image.tmdb.org/t/p/original" + company["logo_path"]
    return data, 200

@app.route('/api/random', methods=['GET'])
@cross_origin()
def random():
    headers = {
        'Authorization': 'Bearer ' + tmdb_authorization_header,
        'accept': 'application/json'
    }
    conn.request("GET", "/3/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1", headers=headers)
    res = conn.getresponse()
    data = res.read()
    #for altt the backdrop_path append the base url
    data = json.loads(data)
    for movie in data["results"]:
        if movie["backdrop_path"]:
            movie["backdrop_path"] = "https://image.tmdb.org/t/p/original" + movie["backdrop_path"]
        if movie["poster_path"]:
            movie["poster_path"] = "https://image.tmdb.org/t/p/original" + movie["poster_path"]

            try:
                #production companies logos
                for company in movie["production_companies"]:
                    if company["logo_path"]:
                        company["logo_path"] = "https://image.tmdb.org/t/p/original" + company["logo_path"]
            except:
                pass
    return data, 200

@app.route('/api/classify/<movie_id>', methods=['GET'])
@cross_origin()
def get_sentiment(movie_id):
    headers = {
        'Authorization': 'Bearer ' + tmdb_authorization_header,
        'accept': 'application/json'
    }
    conn.request("GET", "/3/movie/" + movie_id + "?append_to_response=reviews", headers=headers)
    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)
    reviews = data["reviews"]["results"]
    
    reviews = [clean_text(review["content"]) for review in reviews]

    #if there are no reviews
    if len(reviews) == 0:
        return jsonify({'result': 'No reviews found'}), 400

    #vectorize the reviews

    vectorizer = load('vectorizer.joblib')

    reviews = vectorizer.transform(reviews)


    filename = 'LogisticRegressionModel.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    sentiment = loaded_model.predict(reviews)
    positive = 0
    negative = 0
    for i in sentiment:
        if i == 1:
            positive += 1
        else:
            negative += 1
    if positive > negative:
        return jsonify({'result': 'Good Movie'}), 200
    else:
        return jsonify({'result': 'Bad Movie'}), 400
    

@app.route('/api/generate_review/<movie_id>', methods=['GET'])
@cross_origin()
def generate_review(movie_id):
    # Fetch existing reviews for the movie
    headers = {
        'Authorization': 'Bearer ' + tmdb_authorization_header,
        'accept': 'application/json'
    }
    conn.request("GET", "/3/movie/" + movie_id + "?append_to_response=reviews", headers=headers)
    res = conn.getresponse()
    data = res.read()
    data = json.loads(data)
    try:
        reviews = data["reviews"]["results"]
        
        # Combine the reviews to form a prompt for ChatGPT
        combined_reviews = " ".join([review["content"] for review in reviews])
        
        # Generate a review using bard
        query_string = "Generate a review for " + data["title"] + " movie based on the following reviews: " + combined_reviews + " Write a concise review (only a parragraph):"


    
        #result = bardapi.core.Bard(token).get_answer(query_string)

        #get the first choice
        result = result["choices"][0]["content"]

        #result to string
        result = str(result[0])

        #remove * symbol
        result = result.replace("*", "")
    except:
        result = "Sorry, I couldn't generate a review for this movie."


    return jsonify({'result': result}), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
