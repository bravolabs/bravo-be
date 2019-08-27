const server = require('./express-server');
const { port } = require('./config');

server.listen(port, () => {
  console.log(`running on ${port}`);
});
