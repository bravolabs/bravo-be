exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate transactions cascade;').then(function() {
    // Inserts seed entries
    return knex('transactions').insert([
      {
        org_id: 1,
        giver_id: 1,
        receiver_id: 6,
        action_id: 1,
        shoutout_id: 1,
      },
      {
        org_id: 1,
        giver_id: 2,
        receiver_id: 3,
        action_id: 2,
        shoutout_id: 2,
      },
      {
        org_id: 1,
        giver_id: 4,
        receiver_id: 5,
        action_id: 2,
        shoutout_id: 2,
      },
      {
        org_id: 1,
        giver_id: 4,
        receiver_id: 7,
        action_id: 3,
        shoutout_id: 2,
      },
    ]);
  });
};
