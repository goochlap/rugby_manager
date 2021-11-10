// @desc      Get teams
// @route     GET /teams
// @access    Public
export const getTeams = async (req, res, next) => {
  res.status(200).json({ success: true, data: 'get all teams' });
};
