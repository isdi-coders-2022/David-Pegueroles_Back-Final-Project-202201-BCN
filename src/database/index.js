const debug = require("debug")("pym:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const databaseConnection = (url) =>
  new Promise((resolve, reject) => {
    mongoose.connect(url, (error) => {
      mongoose.set("debug", true);
      mongoose.set("toJSON", {
        virtuals: true,
        transform: (doc, ret) => {
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          delete ret._id;
          // eslint-disable-next-line no-param-reassign, no-underscore-dangle
          delete ret.__v;
        },
      });
      if (error) {
        reject(new Error("Couldn't connect to the database"));
        return;
      }
      debug(chalk.green.bold.italic("Connected to the database"));
      resolve();
    });
  });

module.exports = databaseConnection;
