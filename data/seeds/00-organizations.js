exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate organizations cascade;').then(function() {
    // Inserts seed entries
    return knex('organizations').insert([
      {
        slack_org_id: 'QHUESBNDGE',
        name: 'Lambda-School',
        channel_name: 'general',
        channel_id: 'OQWSHEDJTE',
        access_token: 'seedingaccesstoken',
      },
      {
        slack_org_id: 'OQWSHEDJTE',
        name: 'Andela',
        channel_name: 'general',
        channel_id: 'OQWSHEDJTE',
        access_token: 'seedingaccesstoken',
      },
      {
        slack_org_id: 'ZQPKSGDNJE',
        name: 'Bravo',
        channel_name: 'general',
        channel_id: 'OQWSHEDJTE',
        access_token: 'seedingaccesstoken',
      },
      {
        slack_org_id: 'LOQASJWREJ',
        name: 'Banana',
        channel_name: 'general',
        channel_id: 'OQWSHEDJTE',
        access_token: 'seedingaccesstoken',
      },
      {
        slack_org_id: 'AHWQIPKGFD',
        name: 'Roller-Coaster',
        channel_name: 'general',
        channel_id: 'OQWSHEDJTE',
        access_token: 'seedingaccesstoken',
      },
    ]);
  });
};
