module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      guesses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ratio: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterCreate: async (user) => {
          await sequelize.models.ScoreboardUser.create({
            UserId: user.id,
            ScoreboardId: 1,
          });
          const score = await sequelize.models.Score.create({
            UserId: user.id,
            ScoreboardId: 1,
          });
        },
        afterUpdate: async (user) => {
          if (user.changed("points") || user.changed("guesses")) {
            const ratio = user.points / (user.guesses * 5);
            if (user.getDataValue("ratio") !== ratio) {
              await user.setDataValue("ratio", ratio);
              await user.save();
            }
          }
        },
      },
    }
  );
  Users.associate = (models) => {
    Users.hasMany(models.Guess, {
      onDelete: "CASCADE",
    });
    Users.belongsToMany(models.Scoreboard, { through: models.ScoreboardUser });
    Users.hasMany(models.Score);
  };
  return Users;
};
