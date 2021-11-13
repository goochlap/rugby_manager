import { Router } from 'express';
import { getTeams, createTeam, getTeam } from '../controllers/teams';

const router = Router();

router.route('/').get(getTeams).post(createTeam);

router.route('/:id').get(getTeam);

export default router;
