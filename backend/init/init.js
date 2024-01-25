const { initTable, getHundredGames } = require("./functions");
const { getTeamsAndTables, getEvents } = require("../outsource/calls");

const delay = (time) => {
  return new Promise((reslove) => setTimeout(reslove, time));
};
const initOutsourcedData = async () => {
  //init data
  //   await getHundredGames();
  //   await delay(1000 * 80);
  //   await getTeamsAndTables(1000 * 10);
  //   await initTable();
  //   await delay();
  //   //ensure data is updated regulary
  //   setInterval(() => getEvents(), 1000 * 60);
  //   setInterval(() => getTeamsAndTables(), 5000 * 60);
  getEvents();
};

module.exports = { initOutsourcedData };
