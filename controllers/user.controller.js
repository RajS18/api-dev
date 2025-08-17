import Users from '../models/user.model.js';
import mongoose from 'mongoose';

export const getUsers = async (req, res, next) => {
    console.log('Get all users');
    try{
        const usersList = await Users.find();
        return res.status(200).json({
            success: true,
            data: usersList
        });
    }catch(error){
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    console.log('Get user by ID');
    try{
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    }catch(err){
        next(err)
    }
};
