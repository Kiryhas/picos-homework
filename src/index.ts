import { Router } from 'express';
import { eventsRouter, requireAuth, authRouter } from './api';

export const appRouter = Router();
appRouter.use(authRouter);
appRouter.use(requireAuth, eventsRouter);
