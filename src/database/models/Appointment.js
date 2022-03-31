const { model, Schema } = require("mongoose");

const AppointmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

const Appointment = model("Appointment", AppointmentSchema, "appointments");

module.exports = Appointment;
