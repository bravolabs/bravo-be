function validateLoginCredentials(req, res, next) {
  const { accessToken, userId, } = req.body;
  if(!accessToken || accessToken.trim() === '') {
    return res.status(400)
      .json({
        message: 'Missing required accessToken field'
      });
  }
  if(!userId || userId.trim() === '') {
    return res.status(400)
      .json({
        message: 'Missing required userId field'
      });
  }
  next();
}

module.exports = {
  validateLoginCredentials,
}
