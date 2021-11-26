import { Router } from 'express';
import { getPlayers } from '../controllers/players';

const router = Router({ mergeParams: true });

router.route('/').get(getPlayers);

export default router;
