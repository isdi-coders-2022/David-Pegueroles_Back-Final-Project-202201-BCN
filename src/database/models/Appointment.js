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
    type: Date,
    required: true,
  },
  cateogry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

const Appointment = model("Appointment", AppointmentSchema, "appointments");

module.exports = Appointment;
