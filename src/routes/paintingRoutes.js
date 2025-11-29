import { Router } from 'express';
import {
  getPaintingId,
  getPaintings,
} from '../controllers/paintingController.js';

const router = Router();

router.get('/gallery-paintings', getPaintings);

router.get('/gallery-paintings/:paintingId', getPaintingId);
export default router;
