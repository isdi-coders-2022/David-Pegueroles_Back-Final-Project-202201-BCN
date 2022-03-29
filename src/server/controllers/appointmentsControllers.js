const Appointment = require("../../database/models/Appointment");

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({ appointments });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = { getAppointments };
