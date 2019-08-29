function handleError(error, req, res, next) {
  res.status(500).json({
    error: 'server error',
  });
}
module.exports = {
  handleError,
};
