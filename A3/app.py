from flask import Flask, jsonify
from flask import request
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend

import boto3
import requests
import base64

app = Flask(__name__)

aws_access_key_id = ''
aws_secret_access_key = ''

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    )

@app.route("/")
def testing_endpoint():
    try:
        return "Hello Fromm python."
    except Exception as e:
        print("Exception")
        print(str(e))
        return "error"

@app.route("/start")
def start_application():
    try:
        urlofRob = 'http://44.202.179.158:8080/start'
        data = {'banner': 'B00932018', 'ip': '52.201.211.145'}
        response = requests.post(urlofRob, json=data)
        print(response.status_code)
        print(response.content)
        return response.content
    except Exception as e:
        print("Exception")
        print(str(e))
        return "error"


@app.route("/decrypt", methods=['POST'])
def decrypt_string():
    try:
        json_body = request.json
        encoded_data = json_body['message']
        binary_data = base64.b64decode(encoded_data)

        with open("private_key.txt", "rb") as key_file:
            private_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None
            )

        decrypted_data = private_key.decrypt(
            binary_data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA1()),
                algorithm=hashes.SHA1(),
                label=None
            )
        )

        data = {'response': decrypted_data.decode()}
        return_value = jsonify(data)
        return return_value
    except Exception as e:
        print("Exception")
        print(str(e))
        return "error"


@app.route("/encrypt", methods=['POST'])
def encrypt_string():
    try:
        with open('public_key.txt', 'rb') as f:
            public_key = serialization.load_pem_public_key(
                f.read(),
                backend=default_backend()
            )


        json_body = request.json
        message = json_body['message']
        finalmessage = message.encode('ascii')

        encrypted_message = public_key.encrypt(
            finalmessage,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA1()),
                algorithm=hashes.SHA1(),
                label=None
            )
        )

        base64_message = base64.b64encode(encrypted_message)
        data = {'response': base64_message.decode()}
        return_value = jsonify(data)
        return return_value
    except Exception as e:
        print("Exception")
        print(str(e))
        return str(e)

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)
