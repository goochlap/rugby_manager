import errorResponse from '../utils/errorResponse';
import { Team } from '../models/Team';

// @desc      Get teams
// @route     GET /api/v1/teams
// @access    Public
export const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();

    res.status(200).json({ success: true, data: teams });
  } catch (err) {
    next(err);
  }
};

// @desc      Get a single team
// @route     GET /api/v1/teams/:id
// @access    Public
export const getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return next(
        new errorResponse(`Team with id: ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

// @desc      Create new team
// @route     POST /api/v1/teams
// @access    Private
export const createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);

    res.status(201).json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

// @desc      Update a team
// @route     PUT /api/v1/teams/:id
// @access    Private
export const updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!team) {
      return next(
        new errorResponse(`Team with id: ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

// @desc      Delete a team
// @route     DELETE /api/v1/teams/:id
// @access    Private
export const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return next(
        new errorResponse(`Team with id: ${req.params.id} not found`, 404)
      );
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
