import { Router } from "express";
import { processEvents } from './events.controller';

const router = Router();
router.post('/events', processEvents);

export default router;
