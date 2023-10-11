const mongoose = require('mongoose');
const Employee = require('../models/employee');
const faker = require('faker');

// Generate and insert dummy employee records
const dummyEmployees = [];

// Insert employees into the database
mongoose.connect('mongodb://localhost/employee_directory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

Employee.insertMany(dummyEmployees, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Data populated successfully.');
  }
  mongoose.connection.close();
});