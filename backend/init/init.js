const { initTable, getLotsOfGames } = require("./functions");
const { getTeamsAndTables, getTeamsUpdate } = require("../outsource/calls");
const { getEvents } = require("../outsource/calls");

const delay = (time) => {
  return new Promise((reslove) => setTimeout(reslove, time));
};
const initOutsourcedData = async () => {
  //init data
  await delay(1000 * 15);
  await getTeamsAndTables();
  await delay(1000 * 30);
  await initTable();
  await delay(1000 * 10);
  await getLotsOfGames(80, 28);
  await delay(1000 * 80);
  // ensure data is updated regulary
  setInterval(() => getEvents(), 1000 * 60);
  await delay(1000 * 30);
  setInterval(() => getTeamsUpdate(), 1000 * 60 * 5);
  await delay(1000 * 61);
  setInterval(() => getTeamsAndTables(), 1000 * 60 * 60 * 24);
  await delay(1000 * 61);
  setInterval(() => getLotsOfGames(0, 28), 1000 * 60 * 60 * 24);
};

module.exports = { initOutsourcedData };
