const debug = require("debug")("pym:server");
const chalk = require("chalk");

const deployServer = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.green.bold.italic(`Server is up at http://localhost:${port}`)
      );
      resolve();
    });

    server.on("error", (error) => {
      reject(new Error(`Error on server: ${error.message}`));
    });
  });

module.exports = deployServer;
