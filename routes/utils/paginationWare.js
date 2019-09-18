function paginate(req, res, next) {
  const { count, page } = req.query;
  req.limit = (count && parseInt(count)) || 50;
  req.offset = (count && page && parseInt(count) * parseInt(page)) || 0;
  req.previous = page && parseInt(page) - 1;
  req.next = (page && parseInt(page) + 1) || 2;

  next();
}

module.exports = paginate;
