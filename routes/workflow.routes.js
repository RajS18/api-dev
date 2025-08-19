import {Router} from 'express';
import { sendRemiders } from '../controllers/workflow.controller';


const workflowRouter = Router();

userRouter.post('/subscriptions/reminder', sendRemiders);

export default workflowRouter;