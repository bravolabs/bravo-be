function handleError(error, req, res, next) {
  if (error.code === '42703') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(500).json({
    error: 'server error',
  });
}
module.exports = {
  handleError,
};
