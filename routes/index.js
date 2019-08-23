const shoutouts = require('./shoutouts');

function routes(app) {
  app.use('/api/shoutouts', shoutouts)
}

module.exports = routes;
