import { Router } from 'express';
import { getPlayers, getPlayer, createPlayer } from '../controllers/players';

const router = Router({ mergeParams: true });

router.route('/').get(getPlayers).post(createPlayer);

router.route('/:id').get(getPlayer);

export default router;
