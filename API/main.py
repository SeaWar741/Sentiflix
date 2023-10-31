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
import hashlib, binascii, os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

@app.route('/api', methods=['GET'])
@cross_origin()
def api():
    return jsonify({'message': 'Hello, World!'})

# Run Server on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)