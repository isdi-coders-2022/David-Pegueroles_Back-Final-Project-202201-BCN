require("dotenv").config();
const debug = require("debug")("pym:root");
const chalk = require("chalk");
const app = require("./server");
const deployServer = require("./server/deployServer");

const port = process.env.PORT || 6254;

(async () => {
  try {
    await deployServer(port, app);
  } catch (error) {
    debug(chalk.bgRed.white(error.message));
  }
})();
