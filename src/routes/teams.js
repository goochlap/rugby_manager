import { Router } from 'express';
import {
  getTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam
} from '../controllers/teams';

const router = Router();

router.route('/').get(getTeams).post(createTeam);

router.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam);

export default router;
