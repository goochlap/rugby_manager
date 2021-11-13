import { Team } from '../models/Team';

// @desc      Get teams
// @route     GET /api/v1/teams
// @access    Public
export const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();

    res.status(200).json({ success: true, data: teams });
  } catch (err) {
    throw err;
  }
};

// @desc      Get a single team
// @route     GET /api/v1/teams/:id
// @access    Public
export async function getTeam(req, res, next) {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, data: team });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

// @desc      Create new team
// @route     POST /api/v1/teams
// @access    Private
export async function createTeam(req, res, next) {
  try {
    const team = await Team.create(req.body);

    res.status(201).json({ success: true, data: team });
  } catch (err) {
    throw err;
  }
}
