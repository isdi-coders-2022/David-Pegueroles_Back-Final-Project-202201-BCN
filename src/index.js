require("dotenv").config();
const debug = require("debug")("pym:root");
const chalk = require("chalk");
const databaseConnection = require("./database");
const app = require("./server");
const deployServer = require("./server/deployServer");

const port = process.env.PORT || 6254;
const database = process.env.PIN_YOUR_MEETINGS_DB;

(async () => {
  try {
    await deployServer(port, app);
    await databaseConnection(database);
  } catch (error) {
    debug(chalk.bgRed.white(error.message));
  }
})();
