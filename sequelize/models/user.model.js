module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    'user',
    {
      displayName: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
        validate: {
          // We require usernames to have length of at least 3, and
          // only use letters, numbers and underscores.
          is: /^\w{3,20}$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'email failed validation test',
          },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            msg: 'password failed validation test',
            args: [0, 100],
          },
        },
      },
    },
    { tableName: 'users', timestamps: true, updatedAt: false },
  );
};
