import { Router } from 'express';
import {
  createPainting,
  deletePainting,
  updatePainting,
} from '../controllers/adminContriller.js';
import { celebrate } from 'celebrate';
import { createPaintingSchema } from '../validations/paintingsValidation.js';

const router = Router();

//аутентифікація, та роль адміна

router.post('/admin/painting', celebrate(createPaintingSchema), createPainting);
router.delete('/admin/painting/:paintingId', deletePainting);
router.patch('/admin/painting/:paintingId', updatePainting);

export default router;
