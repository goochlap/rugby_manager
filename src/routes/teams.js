import { Router } from 'express';
import {
  getTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam
} from '../controllers/teams';

import { Team } from '../models/Team';
import advancedResults from '../middleware/advancedResults';

// Include other resource routers
import playerRouter from './players';

const router = Router();

// Re-route into other resource router
router.use('/:teamId/players', playerRouter);

router.route('/').get(advancedResults(Team, 'players'), getTeams).post(createTeam);

router.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam);

export default router;
