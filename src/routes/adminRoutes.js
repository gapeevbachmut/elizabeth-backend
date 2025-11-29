import { Router } from 'express';
import {
  createPainting,
  deletePainting,
  updatePainting,
} from '../controllers/adminContriller.js';

const router = Router();

//аутентифікація, та роль адміна

router.post('/admin/painting', createPainting);
router.delete('/admin/painting/:paintingId', deletePainting);
router.patch('/admin/painting/:paintingId', updatePainting);

export default router;
