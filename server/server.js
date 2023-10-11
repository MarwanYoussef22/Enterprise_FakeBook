const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/employee_directory', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define employee schema and model
const employeeSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  jobRole: String,
  workLocation: String,
  salary: Number,
});