import { Router } from 'express';
import { SessionController } from '../controllers/sessionController.js';

const router = Router();

// POST /api/sessions - create a new reflection session
router.post('/', SessionController.createSession);

// GET /api/sessions/:id - retrieve an existing reflection session
router.get('/:id', SessionController.getSession);

export default router;
