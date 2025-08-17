import User from '../models/user.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';


export const signUp = async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        console.log("object",req.body);
        console.log('Incoming request body:', req.body);
        const  {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User already exist');
            error.statusCode = 409;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name:name, email:email, password:hashedPwd}],{session});
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        
        await session.commitTransaction(); 
        session.endSession();
        res.status(201).json({
            success:true,
            message: 'User created successfully',
            data: {
                token: token,
                expiresIn: JWT_EXPIRES_IN,
                user: newUsers[0]
            }
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async(req,res,next)=>{
    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            const error = new Error('User does not exist');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){   
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: existingUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token: token,
                expiresIn: JWT_EXPIRES_IN,
                user: existingUser
            }
        });
    }catch(error){
        next(error);
    } 
}
export const signOut = async(req,res,next)=>{
    
}