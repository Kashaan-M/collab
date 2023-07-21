module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    'project',
    {
      myRole: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          len: {
            msg: 'my_role failed validation test',
            args: [0, 40],
          },
        },
      },
      otherRole: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          len: {
            msg: 'other_role failed validation test',
            args: [0, 40],
          },
        },
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: 'myIdAndTitle',
        validate: {
          len: {
            msg: 'other_role failed validation test',
            args: [0, 150],
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          len: {
            msg: 'project_purpose failed validation test',
            args: [0, 40],
          },
        },
      },
    },
    { tableName: 'projects', timestamps: true },
  );
};
