const { getEvents } = require("./outsource/calls");

setInterval(() => getEvents(), 1000 * 60);
