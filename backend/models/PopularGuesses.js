module.exports = (sequelize, DataTypes) => {
  const PopularGuesses = sequelize.define("PopularGuesses", {
    score: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      defaultValue: 1,
    },
  });
  PopularGuesses.prototype.increment = async function () {
    this.number++;
    await this.save();
  };
  PopularGuesses.prototype.decrement = async function () {
    this.number--;
    await this.save();
  };
  PopularGuesses.associate = (models) => {
    PopularGuesses.belongsTo(models.Scoreboard);
    PopularGuesses.belongsTo(models.Event);
  };
  return PopularGuesses;
};
