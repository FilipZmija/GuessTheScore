const { initTable, getLotsOfGames } = require("./functions");
const { getTeamsAndTables, getTeamsUpdate } = require("../outsource/calls");
const { testLiveGame, createUser } = require("./test");
const compId = "2021,2001,2000,2002,2003,2014,2015,2018,2019".split(",");

const delay = (time) => {
  return new Promise((reslove) => setTimeout(reslove, time));
};

const initOutsourcedData = async () => {
  const updateDate = new Date();
  updateDate.setDate(updateDate.getDate() + 1);
  updateDate.setHours(4);
  updateDate.setMinutes(30);
  updateDate.setSeconds(0);
  updateDate.setMilliseconds(0);
  const now = new Date();

  // // init data
  // for (let i = 0; i < compId.length; i++) {
  //   await getTeamsAndTables(compId[i]);
  // }
  // await delay(1000 * 30);
  // await initTable();
  // await delay(1000 * 40);
  // await getLotsOfGames(-50, 28);
  // await delay(1000 * 5);
  // await createUser();
  // await delay(5000);
  // await testLiveGame();
  // await delay(5000);
  // // // ensure data is updated regulary
  setInterval(() => getLotsOfGames(), 1000 * 60);
  await delay(1000 * 30);
  setInterval(() => getTeamsUpdate(), 1000 * 60 * 5);
  await delay(updateDate - now); //make sure these updates start at 4:30 am
  setInterval(() => getTeamsAndTables(), 1000 * 60 * 60 * 24);
  await delay(1000 * 90);
  setInterval(() => testLiveGame(28), 1000 * 60 * 60 * 24);
  await delay(1000 * 90);
  setInterval(() => getLotsOfGames(27, 29), 1000 * 60 * 60 * 24);
  await getTeamsAndTables();
  await delay(1000 * 90);
  await getLotsOfGames(26, 29);
};

module.exports = { initOutsourcedData };
