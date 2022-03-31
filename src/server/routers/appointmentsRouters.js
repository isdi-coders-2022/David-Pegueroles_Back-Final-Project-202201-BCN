const express = require("express");
const { getAppointments } = require("../controllers/appointmentsControllers");

const router = express.Router();

router.get("/:date", getAppointments);

module.exports = router;
