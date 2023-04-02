import json
import boto3

sqs = boto3.client('sqs')

def lambda_handler(event, context):

	queue_type_name = event['type']

	if queue_type_name == 'CONNECT':
	    queue_url_name = 'https://sqs.us-east-1.amazonaws.com/912499740502/ConnectQueue'
	elif queue_type_name == 'SUBSCRIBE':
	    queue_url_name = 'https://sqs.us-east-1.amazonaws.com/912499740502/SubscribeQueue'
	elif queue_type_name == 'PUBLISH':
	    queue_url_name = 'https://sqs.us-east-1.amazonaws.com/912499740502/PublishQueue'

	response = sqs.receive_message(
	QueueUrl=queue_url_name,
	MaxNumberOfMessages=1,
	WaitTimeSeconds=0
	)


	messagename = response['Messages'][0]
	messagecontent = json.loads(message['Body'])

	# Delete the message from the queue
	sqs.delete_message(
	QueueUrl=queue_url_name,
	ReceiptHandle=messagename['ReceiptHandle']
	)

	if queue_type_name == 'CONNECT':
	    return {
        	'type': 'CONNACK',
        	'returnCode': 0,
        	'username': messagecontent['username'],
        	'password': messagecontent['password']
    	}
	elif queue_type_name == 'SUBSCRIBE':
	    return {
    	    'type': 'SUBACK',
    	    'returnCode': 0
    	}
	elif queue_type_name == 'PUBLISH':
	    return {
    	    'type': 'PUBACK',
    	    'returnCode': 0,
    	    'payload': messagecontent['payload']
    	}