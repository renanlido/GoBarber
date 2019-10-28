import { Router } from 'express';

import UserControler from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMidleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserControler.store);
routes.post('/sessions', SessionController.store);

routes.use(authMidleware);
routes.put('/users', UserControler.update);

export default routes;
