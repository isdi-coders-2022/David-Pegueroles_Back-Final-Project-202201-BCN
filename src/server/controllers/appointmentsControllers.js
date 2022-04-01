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

const deleteAppointment = async (req, res, next) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete({
      _id: req.params.idAppointment,
    });
    res.status(200).json({ deletedAppointment });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const createAppointment = async (req, res, next) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    if (newAppointment) {
      res.status(201).json({ newAppointment });
    } else {
      const error = new Error("Could not create the appointment");
      error.code = 400;
      next(error);
    }
  } catch (error) {
    error.code = 500;
    next(error);
  }
};

module.exports = {
  getDailyAppointments,
  getAppointmentInfo,
  deleteAppointment,
  createAppointment,
};
