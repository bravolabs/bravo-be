exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate actions cascade;').then(function() {
    // Inserts seed entries
    return knex('actions').insert([
      {
        name: 'shoutout',
        reward: 10,
      },
      {
        name: 'reaction',
        reward: 1,
      },
      {
        name: 'comment',
        reward: 2,
      },
    ]);
  });
};
