function validateLoginCredentials(req, res, next) {
  const { accessToken, userId } = req.body;
  if (!accessToken || accessToken.trim() === '') {
    return res.status(400).json({
      message: 'Missing required accessToken field',
    });
  }
  if (!userId || userId.trim() === '') {
    return res.status(400).json({
      message: 'Missing required userId field',
    });
  }
  next();
}

function validateId(req, res, next) {
  const { userId, id } = req.params;
  if ((!userId || userId.trim() === '') && (!id || id.trim() === '')) {
    return res.status(400).json({
      message: `Missing required ${userId ? 'userId' : 'id'} field`,
    });
  }
  next();
}

module.exports = {
  validateLoginCredentials,
  validateId,
};
