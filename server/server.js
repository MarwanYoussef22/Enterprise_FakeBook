const { MongoClient } = require('mongodb');
const express = require('express');
const { faker } = require('@faker-js/faker');
const bodyParser = require('body-parser');
const cors = require('cors')

var url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "enterprise_fakebook";

var app = express();
app.use(bodyParser.json());
app.use(cors());

async function mongoConnect(collectionName) {
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}

app.get("/init", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');
    const security_information = await mongoConnect('security_information');
    
    // await employee_directory.insertOne({
    //     "id": 1, 
    //     "name": "Alan D. Schnitzer",
    //     "phone_number": faker.phone.number(),
    //     "job_role": "Chief Executive Officer",
    //     "work_location": faker.location.city(),
    //     "salary": faker.finance.amount(65000, 200000,0, '$')
    // })
    
    // await security_information.insertOne({
    //     "employee_id": 1, 
    //     "username": faker.internet.userName({firstName: "Alan", lastName: "Schnitzer"}),
    //     "password": faker.internet.password(),
    // });

    // await employee_relations.insertOne({
    //     "mangaer_employee_id": 1, 
    //          "direct_reports": [
    //              "fake_id_1",
    //              "fake_id_2"
    //          ]
    // });

    console.log("INSERTED CEO");
    res.send("Inserted CEO");
    client.close();
});

app.get("/:requestor_id/search/:search_text", async (req, res) => {
    const username = req.header('username');
    console.log('username: ', username);
});

app.get("/:requestor_id/employees/:employee_id", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');

    console.log('requestor_id: ', +req.params.requestor_id);
    const employee = await employee_directory.findOne({ id: +req.params.employee_id });

    console.log("Sending employee: ", employee);
    res.send(employee);
    client.close();
});

// start the rest service
var port = 3001;
console.log('service opening on port: ' + port)
app.listen(port);