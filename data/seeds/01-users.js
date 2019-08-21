
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate users cascade;')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          org_id: 1, 
          slack_mem_id: 'JQUTERWYQOPS',
          email: 'james@abc.com',
          name: 'James'
        },
        {
          org_id: 2, 
          slack_mem_id: 'WQOLKWGCSY',
          email: 'aaron@abc.com',
          name: 'Aaron'
        },
        {
          org_id: 3, 
          slack_mem_id: 'HAQOPKWEYG',
          email: 'petar@abc.com',
          name: 'Petar'
        },
        {
          org_id: 4, 
          slack_mem_id: 'SDWIEPLYHV',
          email: 'borja@abc.com',
          name: 'Borja'
        },
        {
          org_id: 5, 
          slack_mem_id: 'HAQWMSZIHG',
          email: 'maxime@abc.com',
          name: 'Maxime'
        },
        {
          org_id: 1, 
          slack_mem_id: 'TQAWINGSDE',
          email: 'johnson@abc.com',
          name: 'Johnson'
        },
        {
          org_id: 2, 
          slack_mem_id: 'DEWQAOPJHV',
          email: 'noble@abc.com',
          name: 'Noble'
        },
        {
          org_id: 3, 
          slack_mem_id: 'RSJEWUHSVK',
          email: 'samar@abc.com',
          name: 'Samar'
        },
        {
          org_id: 2, 
          slack_mem_id: 'KAQTYETDHM',
          email: 'james@abc.com',
          name: 'James'
        },
      ]);
    });
};
