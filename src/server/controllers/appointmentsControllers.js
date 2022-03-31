const Appointment = require("../../database/models/Appointment");

const getDailyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ date: req.params.date });
    res.status(200).json({ appointments });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const getAppointmentInfo = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById({
      _id: req.params.idAppointment,
    });
    res.status(200).json({ appointment });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = { getDailyAppointments, getAppointmentInfo };
