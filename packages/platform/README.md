# React Frontend - Local Setup

This guide provides instructions for running a React frontend locally, designed to interact with the serverless backend. Please make sure to set up and run the backend by following the [backend README](./path/to/backend/README.md) before starting the frontend.

## Prerequisites

- Ensure the backend is running locally (see [backend setup instructions](./path/to/backend/README.md)).
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) - For managing dependencies and scripts.

## Steps

### 1. Install Dependencies

Run the following command to install project dependencies:

```bash
yarn install
```
### 2. Set Environment Variables

Create an `.env` file in the root directory and fill in the required variables. Ensure these values match those in the backend configuration.

```json
REACT_APP_USER_POOL_ID=_
REACT_APP_USER_POOL_WEB_CLIENT_ID=_
REACT_APP_API=_
```

### 3. Start the Development Server

To start the frontend in development mode, run:

```bash
yarn start
```
or

```bash
yarn serve
```

Note: This command triggers rspack serve --config configs/rspack.dev.js, launching the frontend application in development mode.

### 4. Bundle Code for Production

To compile and bundle the code for production, run:

```bash
yarn build
```
Note: This command triggers rspack --config configs/rspack.prod.js, creating a dist folder with the bundled code ready for deployment.

## Additional Information

- **Frontend Development Port**: The application typically runs on `http://localhost:3000`.
- **Production Output**: Bundled code is available in the `dist` folder for deployment.

Refer to the [backend README](backend) if you encounter issues connecting the frontend to the backend.
