import errorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

// @desc      Get players
// @route     GET /api/v1/players
// @route     GET /api/v1/teams/:teamId/players
// @access    Public
export const getPlayers = asyncHandler(async (req, res, next) => {
  let query;

  const teamId = req.params.teamId;

  if (teamId) {
    query = Player.find({ team: teamId });
  } else {
    query = Player.find()
      .populate({
        path: 'team',
        select: 'name budget'
      })
      .lean();
  }

  const players = await query;

  res.status(200).json({ success: true, count: players.length, players });
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
