import { Router } from 'express';
import { createApplication, health } from '../controllers/applicationsController.js';
import { applicationLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.get('/health', health);
router.post('/applications', applicationLimiter, createApplication);

export default router;
