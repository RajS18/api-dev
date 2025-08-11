# Dev-README.md

## Overview
This document serves as a developer guide to help you build a production-ready REST API from scratch. It explains the steps you have followed so far in your codebase, along with reasoning for each implementation. The guide is structured chronologically to ensure a logical flow for development.

---

## Step 1: Project Initialization
### Why?
To set up the foundation for the project and ensure proper organization of files and dependencies.

### Actions:
1. **Initialize the project**:
   - Run the following command to scaffold the project:
     ```bash
     npx express-generator --git --no-view ./
     ```
   - Delete unnecessary directories (e.g., `views`) and keep only essential files like `app.js` and `node_modules`.

2. **Install dependencies**:
   - Install required dependencies:
     ```bash
     npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser
     ```
   - Install development dependencies:
     ```bash
     npm install --save-dev nodemon eslint
     ```

3. **Update `package.json`**:
   - Add `"type": "module"` to enable ES6 module syntax.
   - Add scripts for development and production:
     ```json
     "scripts": {
       "start": "node app.js",
       "dev": "nodemon app.js"
     }
     ```

---

## Step 2: Environment Configuration
### Why?
To manage sensitive data like database credentials and JWT secrets securely and dynamically based on the environment.

### Actions:
1. **Create `.env` files**:
   - Create `.env.development.local` for development and `.env.production.local` for production.
   - Example `.env.development.local`:
     ```bash
     PORT=5500
     DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     NODE_ENV=development
     JWT_SECRET="secret"
     JWT_EXPIRES_IN=1d
     ```

2. **Load environment variables**:
   - Use `dotenv` to load environment variables dynamically based on `NODE_ENV`.
   - Code in `config/env.js`:
     ```js
     import { config } from "dotenv";
     config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
     export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
     ```

---

## Step 3: Database Setup
### Why?
To establish a connection to MongoDB and ensure proper error handling during database initialization.

### Actions:
1. **Install MongoDB and Mongoose**:
   - Use MongoDB Atlas for cloud-based database hosting.
   - Install `mongoose` for schema-based modeling.

2. **Create a database connection function**:
   - Code in `database/mongodb.js`:
     ```js
     import mongoose from "mongoose";
     import { NODE_ENV, DB_URI } from '../config/env.js';
     if (!DB_URI) {
         throw new Error('Please specify a DB URI in .env file(s)!');
     }
     const connectToDb = async () => {
         try {
             await mongoose.connect(DB_URI);
             console.log(`Connected to MongoDB database in ${NODE_ENV} environment!`);
         } catch (error) {
             console.error('Error connecting to database', error);
             process.exit(1);
         }
     };
     export default connectToDb;
     ```

---

## Step 4: Middleware Setup
### Why?
To handle incoming requests, parse data, and manage errors efficiently.

### Actions:
1. **Add default middlewares**:
   - Code in `app.js`:
     ```js
     app.use(express.json()); // Parse JSON requests
     app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
     app.use(cookieParser()); // Parse cookies
     ```

2. **Create error-handling middleware**:
   - Code in `middlewares/errors.midellware.js`:
     ```js
     const errorMiddleware = (err, req, res, next) => {
         let error = { ...err };
         error.message = err.message;
         console.error(err);

         if (err.name === 'CastError') {
             error = new Error('Resource not found!');
             error.statusCode = 404;
         }
         if (err.code === 11000) {
             error = new Error('Duplicate field value entered!');
             error.statusCode = 400;
         }
         if (err.name === 'ValidationError') {
             error = new Error(Object.values(err.errors).map(val => val.message).join(', '));
             error.statusCode = 400;
         }

         res.status(error.statusCode || 500).json({
             success: false,
             error_message: error.message || 'Server Error!'
         });
     };
     export default errorMiddleware;
     ```

---

## Step 5: MongoDB Modeling
### Why?
To define schemas for resources like users and subscriptions, ensuring data validation and relationships.

### Actions:
1. **Create `user.model.js`**:
   - Code:
     ```js
     import mongoose from "mongoose";
     const userSchema = mongoose.Schema({
         name: { type: String, required: true, trim: true, minLength: 2, maxLength: 30 },
         email: { type: String, required: true, unique: true, trim: true, lowercase: true },
         password: { type: String, required: true, minLength: 6 }
     }, { timestamps: true });
     const User = mongoose.model('User', userSchema);
     export default User;
     ```

2. **Create `subscription.model.js`**:
   - Code:
     ```js
     import mongoose from "mongoose";
     const subSchema = mongoose.Schema({
         name: { type: String, required: true, trim: true },
         price: { type: Number, required: true, min: 0 },
         user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
     }, { timestamps: true });
     const Subscription = mongoose.model('Subscription', subSchema);
     export default Subscription;
     ```

---

## Step 6: Controllers
### Why?
To implement business logic for handling requests and responses.

### Actions:
1. **Create `auth.controller.js`**:
   - Code:
     ```js
     import User from '../models/user.model.js';
     import jwt from 'jsonwebtoken';
     import bcrypt from 'bcryptjs';
     import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

     export const signUp = async (req, res, next) => {
         try {
             const { name, email, password } = req.body;
             const existingUser = await User.findOne({ email });
             if (existingUser) throw new Error('User already exists');

             const hashedPwd = await bcrypt.hash(password, 10);
             const user = await User.create({ name, email, password: hashedPwd });
             const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

             res.status(201).json({ success: true, data: { user, token } });
         } catch (error) {
             next(error);
         }
     };
     ```

---

## Step 7: Routes
### Why?
To define endpoints for resources and map them to controllers.

### Actions:
1. **Create `auth.routes.js`**:
   - Code:
     ```js
     import { Router } from 'express';
     import { signUp } from '../controllers/auth.controller.js';
     const authRouter = Router();
     authRouter.post('/sign-up', signUp);
     export default authRouter;
     ```

2. **Create `subscription.routes.js`**:
   - Code:
     ```js
     import { Router } from 'express';
     const subRouter = Router();
     subRouter.get('/', (req, res) => res.send('Get all subscriptions'));
     export default subRouter;
     ```

---

## Step 8: Application Entry Point
### Why?
To initialize the server and connect all components.

### Actions:
1. **Update `app.js`**:
   - Code:
     ```js
     import express from 'express';
     import { PORT } from './config/env.js';
     import connectToDb from './database/mongodb.js';
     import authRouter from './routes/auth.routes.js';
     const app = express();
     app.use('/api/v1/auth', authRouter);
     app.listen(PORT, async () => {
         await connectToDb();
         console.log(`Server running on ${PORT}`);
     });
     ```

---

## Future Improvements
1. Add unit tests for controllers and routes.
2. Implement rate limiting for security.
3. Add Swagger documentation for API endpoints.

---

This guide will help you recreate a production-ready REST API from scratch while understanding the reasoning behind each step.