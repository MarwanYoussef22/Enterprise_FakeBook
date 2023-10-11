/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'enterprise_fakebook';

// Create a new database.
use(database);

// Create a new collection.
// db.createCollection('employee_directory');
// db.createCollection('employee_relations');
// db.createCollection('security_information');

// db.employee_directory.find({ $where: function() { return this.name.includes("Sch");}})
const temp = 'alan'
// db.employee_directory.find({ name: {$regex: /alan/i}})
db.employee_directory.find({ name: new RegExp(temp, 'i')})