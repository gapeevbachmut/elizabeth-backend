import { Router } from 'express';
import {
  getPaintingId,
  getPaintings,
} from '../controllers/paintingController.js';
import { celebrate } from 'celebrate';
import { paintingIdParamSchema } from '../validations/paintingsValidation.js';

const router = Router();

router.get('/gallery-paintings', getPaintings);

router.get(
  '/gallery-paintings/:paintingId',
  celebrate(paintingIdParamSchema),
  getPaintingId,
);
export default router;
