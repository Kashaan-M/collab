module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    'comment',
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: 'comments', timestamps: true },
  );
};
