import { Team } from '../models/Team';

// @desc      Get teams
// @route     GET /api/v1/teams
// @access    Public
export const getTeams = async (req, res, next) => {
  try {
    const Teams = await Team.find();

    res.status(200).json({ success: true, data: Teams });
  } catch (err) {
    throw err;
  }
};

// @desc      Create new team
// @route     POST /api/v1/teams
// @access    Private
export async function createteam(req, res, next) {
  try {
    const team = await Team.create(req.body);

    res.status(201).json({ success: true, data: team });
  } catch (err) {
    throw err;
  }
}
