const chalk = require("chalk");
const debug = require("debug")("pym:server:middlewares:errors");

const notFoundError = (req, res) => {
  debug(chalk.bgBlack.yellowBright.bold.italic("Endpoint not found!"));
  res.status(404).json({ error: true, message: "Resource not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.bold.bgBlack.red(`FATAL!! Error: ${err.message}`));
  const errorCode = err.code ?? 500;
  const errorMessage = err.code ? err.message : "General Error";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  generalError,
};
