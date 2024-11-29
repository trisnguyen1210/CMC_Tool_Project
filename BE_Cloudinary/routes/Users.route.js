import express from 'express';
import { getUser, logIn, signUp } from '../Controllers/Users.controller.js';
import { hashPassword } from '../Middlewares/HashPassword.js';
import { checkAuthentication } from '../Middlewares/CheckAuthentication.js';
const usersRouter = express.Router();

usersRouter.get('/getUser', checkAuthentication, getUser);

usersRouter.post('/login', logIn);
usersRouter.post('/signUp', hashPassword, signUp);

export default usersRouter;