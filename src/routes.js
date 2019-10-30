import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserControler from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import FileController from './app/controllers/FileController';

import authMidleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

// Routes for creation user and create session
routes.post('/users', UserControler.store);
routes.post('/sessions', SessionController.store);

// Midleware auth validation
routes.use(authMidleware);

// Route update user
routes.put('/users', UserControler.update);

// Route get all providers
routes.get('/providers', ProviderController.index);

// Route upload file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
