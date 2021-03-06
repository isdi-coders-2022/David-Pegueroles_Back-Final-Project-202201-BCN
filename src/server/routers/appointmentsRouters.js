const express = require("express");
const {
  getDailyAppointments,
  getAppointmentInfo,
  deleteAppointment,
  createAppointment,
} = require("../controllers/appointmentsControllers");

const router = express.Router();

router.get("/:date", getDailyAppointments);
router.get("/appointment/:idAppointment", getAppointmentInfo);
router.delete("/appointment/:idAppointment", deleteAppointment);
router.post("/appointment/new", createAppointment);

module.exports = router;
