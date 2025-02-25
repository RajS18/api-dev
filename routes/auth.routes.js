import {Router} from 'express';
const authRouter = Router();
authRouter.post('/sign-up',(req,res)=>{
    res.send({title:'Authroute-sign-up!'});
})
authRouter.post('/sign-in',(req,res)=>{
    res.send({title:'Authroute-sign-in!'});
})
authRouter.post('/sign-out',(req,res)=>{
    res.send({title:'Authroute-sign-out!'});
})
//sebd json like object (JS object);
export default authRouter;