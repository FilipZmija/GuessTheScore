module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    competition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    utcDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTeamCrest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeamCrest: {
      type: DataTypes.STRING,
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
