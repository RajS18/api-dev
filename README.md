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

## API Endpoints

### Authentication
- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT.

### Subscription Management
- **GET /subscriptions**: Fetch all subscriptions.
- **GET /subscriptions/:id**: Fetch a specific subscription.
- **POST /subscriptions**: Create a new subscription.
- **PUT /subscriptions/:id**: Update a subscription.
- **DELETE /subscriptions/:id**: Delete a subscription.

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

## Deployment
To deploy the application:
1. Set up a production `.env.production.local` file with appropriate values.
2. Use a process manager like `PM2` for production:
    ```bash
    npm install -g pm2
    pm2 start server.js --name api-project
    ```
3. Deploy on platforms like AWS, Heroku, or DigitalOcean.

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or support, please contact [your-email@example.com].