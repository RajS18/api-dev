import {Router} from 'express';
import {getUser, getUsers} from '../controllers/user.controller.js';
import authorize from '../middlewares/authorize.middleware.js';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:id', authorize, getUser);

userRouter.post('/',(req,res)=>{
    res.send({title:'Create a user!'});
});
userRouter.put('/:id',(req,res)=>{
    res.send({title:'Update a user!'});
});
userRouter.delete('/:id',(req,res)=>{
    res.send({title:'Remove a user!'});
});
export default userRouter;