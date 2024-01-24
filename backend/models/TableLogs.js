module.exports = (sequelize, DataTypes) => {
  const TableLogs = sequelize.define("TableLogs", {
    position: {
      type: DataTypes.INTEGER,
    },
    playedGames: {
      type: DataTypes.INTEGER,
    },
    form: {
      type: DataTypes.STRING,
    },
    won: {
      type: DataTypes.INTEGER,
    },
    draw: {
      type: DataTypes.INTEGER,
    },
    lost: {
      type: DataTypes.INTEGER,
    },
    points: {
      type: DataTypes.INTEGER,
    },
    goalsFor: {
      type: DataTypes.INTEGER,
    },
    goalsAgainst: {
      type: DataTypes.INTEGER,
    },
    goalDifference: {
      type: DataTypes.INTEGER,
    },
  });
  TableLogs.associate = (models) => {
    TableLogs.belongsTo(models.Tables);
    TableLogs.belongsTo(models.Teams);
  };
  return TableLogs;
};
