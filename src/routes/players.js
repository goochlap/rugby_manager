import { Router } from 'express';
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/players';

import { protect } from '../middleware/auth';

const router = Router({ mergeParams: true });

router.route('/').get(getPlayers).post(protect, createPlayer);

router
  .route('/:id')
  .get(getPlayer)
  .put(protect, updatePlayer)
  .delete(protect, deletePlayer);

export default router;
