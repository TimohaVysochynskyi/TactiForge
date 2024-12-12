import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  getAllWeaponPairsController,
  getWeaponByIdController,
} from '../controllers/weapons.js';

const router = Router();

router.get('/', ctrlWrapper(getAllWeaponPairsController));
router.get('/:id', isValidId, ctrlWrapper(getWeaponByIdController));

export default router;
