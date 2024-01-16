module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define("Teams", {
    ApiId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    name: {
      type: DataTypes.STRING,
    },
    shortName: {
      type: DataTypes.STRING,
    },
    crest: {
      type: DataTypes.STRING,
    },
  });
  Teams.associate = (models) => {
    Teams.hasMany(models.TableLogs);
    Teams.belongsToMany(models.Event, { through: models.EventTeams });
  };
  return Teams;
};
