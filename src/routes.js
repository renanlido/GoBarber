import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserControler from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

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
routes.get('/providers/:providerId/available', AvailableController.index);

// Route Appointment
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// Route Notification
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
// Route Schedule
routes.get('/schedules', ScheduleController.index);

// Route upload file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
