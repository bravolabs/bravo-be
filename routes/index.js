const { handleError } = require('./utils/errorHandler');
const shoutouts = require('./shoutouts');
const auths = require('./auths');
const organizations = require('./organizations');
const users = require('./users');
const commands = require('./commands');
const interactions = require('./interactions');
const install = require('./install');
const transactions = require('./transactions');

function routes(app) {
  app.use('/api/shoutouts', shoutouts);
  app.use('/api/auths', auths);
  app.use('/api/organizations', organizations);
  app.use('/api/users', users);
  app.use('/slack/command', commands);
  app.use('/slack/interactive', interactions);
  app.use('/slack/install', install);
  app.user('/api/transactions', transactions);

  app.use(handleError);
}

module.exports = routes;
