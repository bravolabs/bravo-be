const shoutouts = require('./shoutouts');
const auths = require('./auths');
const commands = require('./commands');
const interactions = require('./interactions');
const install = require('./install');

function routes(app) {
  app.use('/api/shoutouts', shoutouts);
  app.use('/api/auths', auths);
  app.use('/slack/command', commands);
  app.use('/slack/interactions', interactions);
  app.use('/slack/install', install);
}

module.exports = routes;
