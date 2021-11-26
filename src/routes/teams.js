import { Router } from 'express';
import {
  getTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam
} from '../controllers/teams';

// Include other resource routers
import playerRouter from './players';

const router = Router();

// Re-route into other resource router
router.use('/:teamId/players', playerRouter);

router.route('/').get(getTeams).post(createTeam);

router.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam);

export default router;
