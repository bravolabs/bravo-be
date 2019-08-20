import express from 'express';
import commandsController from './controllers/commands';

const router = express.Router();

router.use(commandsController);

export default router;