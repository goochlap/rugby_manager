import errorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

// @desc      Get players
// @route     GET /api/v1/players
// @route     GET /api/v1/teams/:teamId/players
// @access    Public
export const getPlayers = asyncHandler(async (req, res, next) => {
  const teamId = req.params.teamId;

  if (teamId) {
    const players = await Player.find({ team: teamId });
    const team = await Team.findById(teamId);

    res.status(200).json({
      sucess: true,
      team: team.name,
      count: players.length,
      players
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get a single player
// @route     GET /api/v1/players/:id
// @access    Public
export const getPlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate({
    path: 'team',
    select: 'name'
  });

  if (!player) {
    return next(
      new errorResponse(`Player with id: ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, player });
});

// @desc      Create new player
// @route     Post /api/v1/teams/:teamId/players
// @access    Private
export const createPlayer = asyncHandler(async (req, res, next) => {
  req.body.team = req.params.teamId;

  const team = await Team.findById(req.params.teamId);

  if (!team) {
    return next(
      new errorResponse(`Team with the id ${req.params.teamId} doesn't exist`, 404)
    );
  }

  const player = await Player.create(req.body);

  res.status(201).json({ success: true, player });
});

// @desc      Update player
// @route     PUT /api/v1/players/:id
// @access    Private
export const updatePlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  });

  if (!player) {
    return next(
      new errorResponse(`Player with the id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, player });
});

// @desc      Delete player
// @route     DELETE /api/v1/players/:id
// @access    Private
export const deletePlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id);

  if (!player) {
    return next(
      new errorResponse(`Player with the id ${req.params.id} not found`, 404)
    );
  }

  player.remove();

  res.status(204).send();
});
