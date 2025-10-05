import {Router} from 'express';
import { sendRemiders } from '../controllers/workflow.controller.js';


const workflowRouter = Router();

workflowRouter.post('/subscriptions/reminder', sendRemiders);

export default workflowRouter;