module.exports = (sequelize, DataTypes) => {
  const Guess = sequelize.define("Guess", {
    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Guess.associate = (models) => {
    Guess.belongsTo(models.Users);
    Guess.belongsTo(models.Event);
  };
  return Guess;
};
