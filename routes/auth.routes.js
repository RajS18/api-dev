import {Router} from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';
import authorize from '../middlewares/authorize.middleware.js';
import errorMiddleware from '../middlewares/errors.midellware.js';
const authRouter = Router();
authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', authorize, errorMiddleware, signIn);

authRouter.post('/sign-out',signOut);
//sebd json like object (JS object);
export default authRouter;