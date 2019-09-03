const db = require('../dbConfig');
const util = require('util');

async function create(user) {
  try {
    const insert = db('users')
      .insert(user)
      .toString();

    const update = db('users')
      .update(user, '*')
      .whereRaw('users.slack_mem_id = ?', [user.slack_mem_id]);

    const query = util.format(
      '%s ON CONFLICT (slack_mem_id) DO UPDATE SET %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, '')
    );

    let savedUser;
    await db.raw(query).then(res => {
      savedUser = res.rows[0];
    });
    console.log(savedUser);

    return savedUser;
    // const result = await db('users')
    //   .insert(user)
    //   .returning('*');
    // return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function readBySlackId(slack_mem_id) {
  try {
    const result = await db('users')
      .where({ slack_mem_id })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function readById(id) {
  try {
    const result = await db('users')
      .where({ id })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  readBySlackId,
  readById,
};
