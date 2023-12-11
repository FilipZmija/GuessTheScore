module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    teams: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    league: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Event.associate = (models) => {
    Event.hasMany(models.Guess);
  };
  return Event;
};
