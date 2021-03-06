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
    return savedUser;
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

async function readUsersByOrganization(id, limit = 50, offset = 0) {
  try {
    const users = await db('users')
      .where({ org_id: id })
      .limit(limit)
      .offset(offset);
    return users;
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
  readUsersByOrganization,
};
