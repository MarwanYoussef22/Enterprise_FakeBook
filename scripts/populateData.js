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

export function createRandomUser(): User {
  return {
    name: faker.person.fullName(),
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

Employee.insertMany(dummyEmployees, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Data populated successfully.');
  }
  mongoose.connection.close();
});