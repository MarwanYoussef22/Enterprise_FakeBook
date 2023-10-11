const { MongoClient } = require('mongodb');

var url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "enterprise_fakebook";

// async function mongoConnect(collectionName) {
//     await client.connect();
//     const db = client.db(dbName);
//     return db.collection(collectionName);
// }

//db.collection1.insertOne({"ttl": new Date(), "key2": "another value"})
await client.connect();
const db = client.db(dbName);

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

// const collection = await mongoConnect('characters');

// const characters = await collection.find({}).toArray();
client.close();