const app = require('./api');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = app;
