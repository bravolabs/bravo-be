exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate organizations cascade;').then(function() {
    // Inserts seed entries
    return knex('organizations').insert([
      {
        slack_org_id: 'TMNGALGN7',
        name: 'team a',
        channel_name: 'general',
        channel_id: 'CMTJ4G1TK',
        access_token: `${process.env.ACCESS_TOKEN}`,
      },
    ]);
  });
};
