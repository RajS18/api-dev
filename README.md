# API Project

## Overview
This project is a backend REST API designed for managing subscriptions and user authentication. It is built using Node.js, Express, and MongoDB, following best practices for scalability, security, and maintainability.

---

## Features
- **User Authentication**: Secure user registration and login using JWT.
- **Subscription Management**: CRUD operations for subscription resources.
- **Environment Configuration**: Supports multiple environments (development, production).
- **Error Handling**: Centralized error handling middleware.
- **Security**: Input sanitization, JWT-based authentication, and environment variable management.

---

## Technologies Used
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing user and subscription data.
- **Mongoose**: ODM for MongoDB to manage schemas and models.
- **JWT**: JSON Web Tokens for secure authentication.
- **dotenv**: Environment variable management.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd api-project
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create `.env.development.local` and `.env.production.local` files.
    - Example `.env.development.local`:
      ```bash
      PORT=5500
      DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
      NODE_ENV=development
      JWT_SECRET="your-secret-key"
      JWT_EXPIRES_IN=1d
      ```

4. Start the development server:
    ```bash
    npm run dev
    ```
---

## Environment Variables
The application uses environment variables to manage sensitive data. Below is an example configuration:

```bash
PORT=5500
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN=1d
```

---

## Scripts
- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Start Production Server**:
  ```bash
  npm start
  ```
- **Run Tests**:
  ```bash
  npm test
  ```

---

## Deployment - Extras - Not covered
To deploy the application:
1. Set up a production `.env.production.local` file with appropriate values.
2. Use a process manager like `PM2` for production:
    ```bash
    npm install -g pm2
    pm2 start server.js --name api-project
    ```
3. Deploy on platforms like AWS, Heroku, or DigitalOcean.

---

<div align="center">
  <h3 align="center">A Subscription API</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)

## <a name="introduction">Introduction</a>

**Production-ready CRUD API** that handles **real business logic**.  

Authenticate users using JWTs, connect a database, create models and schemas, and integrate it with ORMs. Structure the architecture of your API to ensure scalability and seamless communication with the frontend.  

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Express.js
- MongoDB

## <a name="features">🔋 Features</a>

👉 **Advanced Rate Limiting and Bot Protection**: with Arcjet that helps you secure the whole app.

👉 **Database Modeling**: Models and relationships using MongoDB & Mongoose.

👉 **JWT Authentication**: User CRUD operations and subscription management.

👉 **Global Error Handling**: Input validation and middleware integration.

👉 **Email Reminders - Scheduling workflows**: Automating smart email reminders with workflows using Upstash.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/subscription-tracker-api.git
cd subscription-tracker-api
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5500](http://localhost:5500) in your browser or any HTTP client to test the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>Dummy JSON Data</code></summary>

```json
{
  "name": "XYZ Membership",
  "price": 49.00,
  "currency": "USD",
  "frequency": "monthly",
  "category": "Entertainment",
  "startDate": "2025-01-20T00:00:00.000Z",
  "paymentMethod": "Debit Card"
}
```

</details>

## <a name="links">🔗 Links</a>

- **Arcjet** - [https://launch.arcjet.com/](https://launch.arcjet.com/4g2R2e4)  
- **Upstash** - [https://bit.ly/42ealiN](https://bit.ly/42ealiN)  
