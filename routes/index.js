const shoutouts = require('./shoutouts');

module.exports = function(app) {
  app.use('/api/shoutouts', shoutouts)
}
