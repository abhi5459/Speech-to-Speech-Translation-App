from flask import Flask, send_from_directory,request
from flask_restful import Api, Resource, reqparse
#from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from flask_cors import CORS
from scripts import translated_text       

app = Flask(__name__)
CORS(app) #comment this on deployment
api = Api(app)

# print("hello")

@app.route("/", defaults={'path':''}, methods=['POST', 'GET','OPTIONS'])
def serve(path):
    return "Success"

@app.route('/upload', methods=['GET', 'POST'])
def analyze_data():
    if request.method == 'POST':
        print("hello")
        f = request.files['file']
        # f.save()
        return "test"

api.add_resource(HelloApiHandler, '/flask/hello')
