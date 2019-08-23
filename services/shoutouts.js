const users = require('../data/dbModels/users');
const shoutouts = require('../data/dbModels/shoutouts');
module.exports = {
  getShoutouts: async function(req, res, next) {
    try {
        const { userId } = req.params;
        const user = await users.readBySlackId(userId);
        if(!user || !user.slack_mem_id) {
          return res.status(404)
            .josn({
              message: 'User not found'
            });
        }

        const result = await shoutouts.read(userId);
        if(result.length < 1) {
          return res.status(404)
            .josn({
              message: 'No shoutouts found for the user'
            });
        }
        res.status(200)
          .json({
            data: result
          });
    } catch(error) {
      res.status(500)
        .json({
          error: 'server error'
        })
    }
  }
}
