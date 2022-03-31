const express = require("express");
const {
  getDailyAppointments,
  getAppointmentInfo,
} = require("../controllers/appointmentsControllers");

const router = express.Router();

router.get("/:date", getDailyAppointments);
router.get("/appointment/:idAppointment", getAppointmentInfo);

module.exports = router;
