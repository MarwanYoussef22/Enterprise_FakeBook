const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  jobRole: String,
  workLocation: String,
  salary: Number,
});

module.exports = mongoose.model('Employee', employeeSchema);