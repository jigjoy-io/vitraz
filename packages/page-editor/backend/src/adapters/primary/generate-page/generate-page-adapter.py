
import json
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from page import LessonTemplate
import os
import boto3

def get_secret():
    secret_name = "vars" # The name of the secret
    region_name = "eu-west-1"  # Your AWS region

    # Create a Secrets Manager client
    client = boto3.client('secretsmanager', region_name=region_name)

    try:
        response = client.get_secret_value(SecretId=secret_name)
        secret_value = response['SecretString']
    except Exception as e:
        print(f"Error retrieving secret: {e}")
        raise e
    
    return secret_value

def generatePageHandler(message, context):

    try:

        body = json.loads(message['body'])
        text = body['statement']

        secrets = get_secret()

        # Parse the secret string into a JSON object
        secret_dict = json.loads(secrets)
        
        # Extract the OpenaiApiKey from the secret
        openai_api_key = secret_dict.get('OpenaiApiKey')
        os.environ["OPENAI_API_KEY"] = openai_api_key

        llm = ChatOpenAI(model="gpt-4o", temperature=0)

        lesson_creator = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an agent that creates interactive, multi-page lessons for learners. "
                    "The lesson type you create is educational lessons for self-learners."
                    "Each lesson is structured as a carousel with two parts: "
                    "1. A topic introduction (up to 5 pages). "
                    "2. A question section (up to 5 pages with multi-option questions). "
                    "Ensure that each question has multiple answer choices, and clearly mark each option as correct or incorrect. "
                    "Provide the following for each lesson: "
                    "- Carousel Title: (e.g., 'Introduction to Y Combinator') "
                    "- Carousel Description: A summary of the carousel. "
                    "- Pages: Include page titles and content for each page in the carousel. "
                ),
                ("human", "{text}"),
            ]
        )
        runnable = lesson_creator | llm.with_structured_output(schema=LessonTemplate)
        microlessons = runnable.invoke({"text": text})

        # Instantiate BlankPage
        blank_page = LessonTemplate.model_dump_json(microlessons)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "POST, PUT, GET, DELETE, OPTIONS",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": blank_page
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        }

