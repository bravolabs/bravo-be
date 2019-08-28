const shoutouts = require('./shoutouts');
const commands = require('./commands');
const interactions = require('./interactions');
const install = require('./install');

function routes(app) {
  app.use('/api/shoutouts', shoutouts);
  app.use('/slack/command', commands);
  app.use('/slack/interactive', interactions);
  app.use('/slack/install', install);
}

module.exports = routes;
