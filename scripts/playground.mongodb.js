/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'enterprise_fakebook';

// Create a new database.
use(database);

// Create a new collection.
// db.createCollection('employee_directory');
// db.createCollection('security_information');

// db.employee_directory.drop();
// db.security_information.drop();


// db.employee_directory.find({ $where: function() { return this.name.includes("Sch");}})
const temp = 'port'
// db.employee_directory.find({ name: {$regex: temp, $options: "xi"}})
// db.employee_directory.find({ $or: [
// {name: {$regex: temp, $options: "xi"}},
// {work_location: {$regex: temp, $options: "xi"}}
// ]})


db.employee_directory.find({ photo_url: {$regex: 'women', $options: "xi"}})