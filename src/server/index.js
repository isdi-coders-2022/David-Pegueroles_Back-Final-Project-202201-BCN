const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { notFoundError, generalError } = require("./middlewares/errors");
const appointmentsRouter = require("./routers/appointmentsRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/calendar", appointmentsRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
