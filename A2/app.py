
from flask import Flask, jsonify
from flask import request

import boto3
import requests

app = Flask(__name__)

aws_access_key_id = 'AKIAWSATUZV5MXJDWBPO'
aws_secret_access_key = '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'

s3_bucket_name = 'arpitcloudboto3bucket'
s3_file_key = 'arpit1998'

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    )

s3 = session.client('s3')

@app.route("/")
# create a new file in S3
def start_application():
    try:
        urlofRob = 'http://52.91.127.198:8080/start'
        data = {'banner': 'B00932018', 'ip': '34.203.77.76'}
        response = requests.post(urlofRob, json=data)
        print(response.status_code)
        print(response.content)
    except Exception as e:
        print("Exception")
        print(str(e))
        return "error"


@app.route("/storedata", methods=['POST'])
# create a new file in S3
def create_file():
    try:
        json_body = request.json
        body_content = json_body['data']
        s3.put_object(Bucket=s3_bucket_name, Key=s3_file_key, Body=body_content)
        url = s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': s3_bucket_name, 'Key': s3_file_key},
        ExpiresIn=3600
        )
        data = {'s3uri': url}
        return_value = jsonify(data)
        return return_value
    except Exception as e:
        print("Exception")
        print(str(e))
        return 400


@app.route('/appenddata', methods=['POST'])
def append_file():
    try:
        json_body = request.json
        body_content = json_data['data']
        response = s3.get_object(Bucket=s3_bucket_name, Key=s3_file_key)
        file_content = response['Body'].read().decode('utf-8')
        new_file_content = file_content + body_content
        s3.put_object(Bucket=s3_bucket_name, Key=s3_file_key, Body=new_file_content)
        return 'String appended to file successfully.'
    except Exception as e:
        print("Exception")
        print(str(e))
        return 400



@app.route('/deletefile', methods=['POST'])
def delete_file():
    try:
        json_body = request.json
        body_content = json_data['s3uri']
        s3.delete_object(Bucket=s3_bucket_name, Key=s3_file_key)
        return 'File deleted from S3'
    except Exception as e:
        print("Exception")
        print(str(e))
        return 400

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)
