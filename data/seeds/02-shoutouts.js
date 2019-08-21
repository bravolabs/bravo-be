
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shoutouts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('shoutouts').insert([
        {
          giver_id: 1, 
          receiver_id: 2, 
          message: 'Great Job'
        },
        {
          giver_id: 3, 
          receiver_id: 1, 
          message: 'Awesome work on te project'
        },
        {
          giver_id: 3, 
          receiver_id: 2, 
          message: 'Well done greatly'
        },
        {
          giver_id: 4, 
          receiver_id: 2, 
          message: `You've done well, I'm super proud of you`
        },
        {
          giver_id: 5, 
          receiver_id: 2, 
          message: 'Big win, man'
        },
        {
          giver_id: 6, 
          receiver_id: 2, 
          message: 'Great Work'
        },
        {
          giver_id: 7, 
          receiver_id: 2, 
          message: 'Awesome Job'
        },
        {
          giver_id: 8, 
          receiver_id: 2, 
          message: 'Good Job, man'
        },
        {
          giver_id: 2, 
          receiver_id: 4, 
          message: 'Great Job'
        },
        {
          giver_id: 3, 
          receiver_id: 4, 
          message: 'Awesome Job'
        },
        {
          giver_id: 5, 
          receiver_id: 4, 
          message: 'Good Job'
        },
        {
          giver_id: 6, 
          receiver_id: 4, 
          message: 'Awesome work'
        },
        {
          giver_id: 7, 
          receiver_id: 4, 
          message: 'Marvelous Job'
        },
        {
          giver_id: 8, 
          receiver_id: 4, 
          message: 'Beautiful Job'
        },
        {
          giver_id: 8, 
          receiver_id: 1, 
          message: 'Wonderful Job'
        },
        {
          giver_id: 5, 
          receiver_id: 1, 
          message: 'Cool Job'
        },
      ]);
    });
};
