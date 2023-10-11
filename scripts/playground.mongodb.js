/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const faker = require('faker');

const database = 'enterprise_fakebook';

// Create a new database.
use(database);

// Create a new collection.
// db.createCollection('employee_directory');
// db.createCollection('employee_relations');
// db.createCollection('security_information');

db.employee_directory.insertOne({
    "id": 1, 
    "name": "Alan D. Schnitzer",
    "phone_number": faker.phone.number(),
    "job_role": "Chief Executive Officer",
    "work_location": faker.location.city(),
    "salary": faker.finance.amount(65000, 200000,0, $)
})

db.security_information.insertOne({
    "employee_id": 1, 
    "username": faker.internet.username({firstname: "Alan", lastname: "Schnitzer"}),
    "password": faker.internet.password(),
})

// faker.person.jobTitle()

// for(int i =0, i<5, i++){
//     db.employee_directory.insertOne({
//         "ttl": new Date(),
//         "key2": "another value"
//     })
// }

// const collection = await mongoConnect('characters');

// const characters = await collection.find({}).toArray();
// client.close();