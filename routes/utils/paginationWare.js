function paginate(req, res, next) {
  const { count, page } = req.query;
  const counter = (count && parseInt(count)) || 50;
  const pageNumber = (page && parseInt(page)) || 1;
  req.limit = counter;
  req.offset = counter * (pageNumber - 1);
  req.previous = pageNumber - 1 || null;
  req.next = pageNumber + 1;

  next();
}

module.exports = paginate;
