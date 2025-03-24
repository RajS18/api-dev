import {Router} from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';
const authRouter = Router();
authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in',signIn);

authRouter.post('/sign-out',signOut);
//sebd json like object (JS object);
export default authRouter;