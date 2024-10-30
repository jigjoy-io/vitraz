# Serverless Backend - Local Setup

This guide provides instructions for running a serverless backend locally using AWS SAM (Serverless Application Model). Follow the steps below to set up your environment and start the local server.

## Prerequisites

Ensure the following tools are installed on your machine:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) - For configuring AWS profiles and managing resources.
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) - For building and running the serverless application locally.

## Steps

### 1. Configure AWS CLI

Set up the AWS CLI with a `Development` profile:

```bash
aws configure --profile Development
```

You’ll be prompted to enter your AWS Access Key, Secret Key, region, and output format. The Development profile will be used to manage the environment configuration for local development.

### 2. Set Environment Variables

Create an environment variables file (env.json) and fill in the required values:

```json
{
	"VerifyAuthChallengeResponse": {
		"KMS_KEY_ID": "_"
	},
	"sendMagicLinkFunction": {
		"KMS_KEY_ID": "_",
		"USER_POOL_ID": "_",
		"BASE_URL": "_"
	},
	"createPageFunction": {
		"PAGE_TABLE": "_"
	},
	"retrievePageFunction": {
		"PAGE_TABLE": "_"
	},
	"accessPageFunction": {
		"PAGE_TABLE": "_"
	},
	"uploadDocumentFunction": {
		"ASSETS_BUCKET": "_"
	},
	"retrievePagesFunction": {
		"PAGE_TABLE": "_"
	},
	"updatePageFunction": {
		"PAGE_TABLE": "_"
	},
	"removePageFunction": {
		"PAGE_TABLE": "_",
		"ASSETS_BUCKET": "_"
	},
	"publishPageFunction": {
		"PAGE_TABLE": "_"
	},
	"saveUserFeedbackFunction": {
		"USER_FEEDBACK_TABLE": "_"
	}
}
```

### 3. Build the Application

Run the following command to build the serverless application:

```bash
yarn build
```

Note: This command triggers sam build --profile Development, which compiles the serverless application with the Development profile.

### 4. Start the Local Server

Run the following command to start the local server:

```bash
yarn serve
```

Note: This command triggers sam local start-api --profile Development --port 8000 --region eu-west-1 --env-vars env.json, launching the API on port 8000 with the specified environment variables.
