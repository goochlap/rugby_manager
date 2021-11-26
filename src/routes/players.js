import { Router } from 'express';
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/players';

const router = Router({ mergeParams: true });

router.route('/').get(getPlayers).post(createPlayer);

router.route('/:id').get(getPlayer).put(updatePlayer).delete(deletePlayer);

export default router;
