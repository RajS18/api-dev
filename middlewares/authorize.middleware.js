import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; // Extract token from Bearer token
        } else if(req.cookies && req.cookies.token) {
            token = req.cookies.token; // Extract token from cookies
        }
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Authorization failed, token not found'
            });
        }
        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Authorization failed, user not found'
            });
        }

        req.user = user; // Attach user to request object
        
        next(); // Proceed to the next middleware or route handler
    }catch(error){
        console.log('object');
        return res.status(401).json({
            success: false,
            message: 'Authorization failed',
            error: error.message
        });
    }
}
export default authorize;
// This middleware can be used in routes to protect them