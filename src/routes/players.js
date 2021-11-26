import { Router } from 'express';
import { getPlayers, getPlayer } from '../controllers/players';

const router = Router({ mergeParams: true });

router.route('/').get(getPlayers);

router.route('/:id').get(getPlayer);

export default router;
