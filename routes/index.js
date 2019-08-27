const shoutouts = require('./shoutouts');
const auths = require('./auths');
const commands = require('./commands');
const interactions = require('./interactions');

function routes(app) {
  app.use('/api/shoutouts', shoutouts);
  app.use('/api/auths', auths);
  app.use('/slack/command', commands);
  app.use('/slack/interactions', interactions);
}

module.exports = routes;
