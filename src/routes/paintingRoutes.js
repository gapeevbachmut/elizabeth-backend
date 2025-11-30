import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getPaintingId,
  getPaintings,
} from '../controllers/paintingController.js';
import {
  getPaintingsSchema,
  paintingIdParamSchema,
} from '../validations/paintingsValidation.js';

const router = Router();

router.get('/gallery-paintings', celebrate(getPaintingsSchema), getPaintings);

router.get(
  '/gallery-paintings/:paintingId',
  celebrate(paintingIdParamSchema),
  getPaintingId,
);
export default router;
