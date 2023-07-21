const { Sequelize, DataTypes } = require('sequelize');
const setup_relations = require('./relations');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_USER_PASS,
  {
    dialect: 'postgres',
  },
);

const modelDefiners = [
  require('./models/user.model'),
  require('./models/project.model'),
  require('./models/comment.model'),
  // Junction Models
  //
  // Add more models here...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

// We execute any extra setup after the models are defined, such as adding associations.
setup_relations(sequelize);

module.exports = { sequelize };
