import {Router} from 'express';
import { createSubscription, getAllSubscriptionForAUser } from '../controllers/subscription.controller.js';
import authorize from '../middlewares/authorize.middleware.js';

const subRouter = Router();
subRouter.get('/',(req,res)=>{
    res.send({title:'Get all the subscriptions!'});
});
subRouter.get('/:id',(req,res)=>{
    res.send({title:'Get a subscription!'});
});

subRouter.post('/', authorize, createSubscription);


subRouter.put('/:id',(req,res)=>{
    res.send({title:'Update a subscriptions!'});
});
subRouter.delete('/:id',(req,res)=>{
    res.send({title:'Delete a subscription!'});
});


subRouter.get('/user/:id', authorize, getAllSubscriptionForAUser);

subRouter.put('/:id/cancel',(req,res)=>{
    res.send({title:'Cancel a subscription!'});
})
subRouter.get('/uncoming-renewals',(req,res)=>{
    res.send({title:`Get all upcoming subscriptions' renewals!`});
});
export default subRouter;