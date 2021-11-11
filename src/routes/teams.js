import { Router } from 'express';
import { getTeams, createteam } from '../controllers/teams';

const router = Router();

router.route('/').get(getTeams).post(createteam);

export default router;
