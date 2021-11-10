import { Router } from 'express';
import { getTeams } from '../controllers/teams';

const router = Router();

router.route('/').get(getTeams);

export default router;
