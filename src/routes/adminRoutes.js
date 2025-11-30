import { Router } from 'express';
import {
  createPainting,
  deletePainting,
  updatePainting,
} from '../controllers/adminContriller.js';
import { celebrate } from 'celebrate';
import {
  createPaintingSchema,
  paintingIdParamSchema,
  updatePaintingSchema,
} from '../validations/paintingsValidation.js';

const router = Router();

//  чи треба дублювати прості маршрути??? GET
//аутентифікація, та роль адміна

router.post('/admin/painting', celebrate(createPaintingSchema), createPainting);
router.delete(
  '/admin/painting/:paintingId',
  celebrate(paintingIdParamSchema),
  deletePainting,
);
router.patch(
  '/admin/painting/:paintingId',
  celebrate(updatePaintingSchema),
  updatePainting,
);

export default router;
