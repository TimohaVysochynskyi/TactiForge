import { Router } from 'express';

import authRouter from './auth.js';
import weaponsRouter from './weapons.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/weapons', weaponsRouter);

export default router;
