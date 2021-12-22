import { Router } from 'express';
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/players';

import { protect } from '../middleware/auth';

import { Player } from '../models/Player';
import advancedResults from '../middleware/advancedResults';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Player, {
      path: 'team',
      select: 'name'
    }),
    getPlayers
  )
  .post(protect, createPlayer);

router
  .route('/:id')
  .get(getPlayer)
  .put(protect, updatePlayer)
  .delete(protect, deletePlayer);

export default router;
