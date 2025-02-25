import mongoose from "mongoose";
import {NODE_ENV, DB_URI} from '../config/env.js';
if(!DB_URI){
    throw new Error('Please specify a DB url for the DB connection in .env file(s) - dev/prod!');
}
const connectToDb = async()=>{
    try{
        await mongoose.connect(DB_URI); 
        console.log(`Connected to MongoDB daatbse in ${NODE_ENV} environment!`);
    }catch(error){
        console.error('Error connecting to database',error);
        process.exit(1);
    }
}
export default connectToDb;