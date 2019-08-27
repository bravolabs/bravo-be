exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate organizations cascade;').then(function() {
    // Inserts seed entries
    return knex('organizations').insert([
      {
        slack_org_id: 'QHUESBNDGE',
        name: 'Lambda-School',
      },
      {
        slack_org_id: 'OQWSHEDJTE',
        name: 'Andela',
      },
      {
        slack_org_id: 'ZQPKSGDNJE',
        name: 'Bravo',
      },
      {
        slack_org_id: 'LOQASJWREJ',
        name: 'Banana',
      },
      {
        slack_org_id: 'AHWQIPKGFD',
        name: 'Roller-Coaster',
      },
    ]);
  });
};
