from flask_restful import Api, Resource, reqparse
from httpx import request
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

from scripts import translated_text


class HelloApiHandler(Resource):
    def get(self):
      data = request.get_json()
      data = jsonify(data)
      return data 

    def post(self):
      f = request.files['file']
      print("excuse me",request.data,request.form,request.files,f)
      f.save("temp.wav")
      original_text,new_text,output=translated_text("temp.wav")
      output = base64.b64encode(output.getvalue()).decode()
      print("op.get is ", output)
      values={
        'original_text':original_text,
        'new_text':new_text,
        'output':output
      }
      return values
      