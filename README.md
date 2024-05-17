# User List Management and Email Sending API

## Overview

This project is a RESTful API for managing user lists with customizable properties and sending emails to users.

## Features

- Admin can create a list with custom properties.
- Admin can add users to the list via CSV upload.
- Admin can send emails to users in the list with custom placeholders.
- Unsubscribe functionality for users.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Nodemailer

## Setup

1. Clone the repository.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following variables:

    ```env
    MONGO_URI=your-mongodb-uri
    EMAIL_USER=your-email
    EMAIL_PASS=your-email-password
    PORT=5000
    ```

4. Start the server:

    ```bash
    npm start
    ```

## API Endpoints

### Create a List

- **URL:** `/api/lists`
- **Method:** `POST`
- **Body:** 

    ```json
    {
      "title": "List Title",
      "customProperties": [
        {
          "title": "city",
          "fallbackValue": "Unknown"
        }
      ]
    }
    ```

### Add Users

- **URL:** `/api/lists/:listId/users`
- **Method:** `POST`
- **Body:** CSV file with headers `name`, `email`, and custom properties.

### Send Email to List

- **URL:** `/api/emails`
- **Method:** `POST`
- **Body:**

    ```json
    {
      "listId": "list_id",
      "emailBody": "Email body with [placeholders]"
    }
    ```

## License

This project is licensed under the MIT License.
