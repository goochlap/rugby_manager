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

import { protect, authorize } from '../middleware/auth';

// Include other resource routers
import playerRouter from './players';

const router = Router();

// Re-route into other resource router
router.use('/:teamId/players', playerRouter);

router
  .route('/')
  .get(advancedResults(Team, 'players'), getTeams)
  .post(protect, authorize('admin', 'manager'), createTeam);

router
  .route('/:id')
  .get(getTeam)
  .put(protect, authorize('admin', 'manager'), updateTeam)
  .delete(protect, authorize('admin', 'manager'), deleteTeam);

export default router;
