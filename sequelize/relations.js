const { DataTypes } = require('sequelize');

function setup_relations(sequelize) {
  const { user, project, comment } = sequelize.models;

  // 1:N
  // project <--- user
  user.hasMany(project, {
    foreignKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'myIdAndTitle',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  project.belongsTo(user);

  // 1:N
  // comment <--- user
  user.hasMany(comment, {
    foreignKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  comment.belongsTo(user);

  // 1:N
  // comment <--- project
  project.hasMany(comment, {
    foreignKey: {
      type: DataTypes.INTEGER,
      allowNull: false, // the foreignKey for questionId MUST exist in answer Model
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  comment.belongsTo(project);
}

module.exports = setup_relations;
