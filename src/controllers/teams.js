import errorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Team } from '../models/Team';

// @desc      Get teams
// @route     GET /api/v1/teams
// @access    Public
export const getTeams = asyncHandler(async (req, res, next) => {
  const teams = await Team.find();

  res.status(200).json({ success: true, data: teams });
});

// @desc      Get a single team
// @route     GET /api/v1/teams/:id
// @access    Public
export const getTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(new errorResponse(`Team with id: ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, data: team });
});

// @desc      Create new team
// @route     POST /api/v1/teams
// @access    Private
export const createTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.create(req.body);

  res.status(201).json({ success: true, data: team });
});

// @desc      Update a team
// @route     PUT /api/v1/teams/:id
// @access    Private
export const updateTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!team) {
    return next(new errorResponse(`Team with id: ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, data: team });
});

// @desc      Delete a team
// @route     DELETE /api/v1/teams/:id
// @access    Private
export const deleteTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findByIdAndDelete(req.params.id);

  if (!team) {
    return next(new errorResponse(`Team with id: ${req.params.id} not found`, 404));
  }

  res.status(204).send();
});
