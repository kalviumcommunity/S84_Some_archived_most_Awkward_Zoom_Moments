const sequelize = require('./db');
const User = require('./models/User.js');
const Entity = require('./models/Moment.js');

const seed = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate([
    { username: 'alice' },
    { username: 'bob' },
    { username: 'carol' }
  ]);

  await Entity.bulkCreate([
    { title: 'Entity 1', description: 'First entity', created_by: users[0].id },
    { title: 'Entity 2', description: 'Second entity', created_by: users[1].id },
    { title: 'Entity 3', description: 'Third entity', created_by: users[2].id },
    { title: 'Entity 4', description: 'Fourth entity', created_by: users[0].id }
  ]);

  console.log('Seed complete');
  process.exit();
};

seed();
