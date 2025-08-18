import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/subscription.routes.js';
import connectToDb from './database/mongodb.js';
import errorMiddleware from './middlewares/errors.midellware.js';
import arcjetmiddleware from './middlewares/arcjet.middleware.js';


const app = express();
//Middlewares
app.use(express.json()); //middleware to get json req and response.
app.use(express.urlencoded({extended: false})); //url request encoding
app.use(cookieParser());
app.use(errorMiddleware);
app.use(arcjetmiddleware);

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subs',subRouter);




app.get('/',(req,res) => {
    res.send('Hi from API')
});
app.listen(PORT, async ()=>{
    await connectToDb();
    console.log(`API Server running on ${PORT}`);
});
export default app;