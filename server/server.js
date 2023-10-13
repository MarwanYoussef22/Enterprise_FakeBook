const { MongoClient } = require('mongodb');
const express = require('express');
const { faker } = require('@faker-js/faker');
const bodyParser = require('body-parser');
const cors = require('cors')

const url = "mongodb://localhost:27017";
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

    await employee_directory.insertOne({
        "id": 1,
        "first_name": 'Alan',
        "last_name": 'Schnitzer',
        "phone_number": faker.phone.number(),
        "job_role": "Chief Executive Officer",
        "work_location": `${faker.location.city()}, ${faker.location.state({abbreviated: true})}`,
        "salary": '$1300000',
        "photo_url": '/Alan_Schnitzer.png'
    })

    await security_information.insertOne({
        "employee_id": 1, 
        "username": faker.internet.userName({firstName: "Alan", lastName: "Schnitzer"}),
        "password": faker.internet.password(),
    });

    const firstNameHR = faker.person.firstName('female');
    const lastNameHR = faker.person.lastName();

    await employee_directory.insertOne({
        "id": 2,
        "first_name": firstNameHR,
        "last_name": lastNameHR,
        "phone_number": faker.phone.number(),
        "job_role": "Human Resource Manager",
        "work_location": `${faker.location.city()}, ${faker.location.state({abbreviated: true})}`,
        "salary": faker.finance.amount(65000, 200000, 0, '$'),
        "manager_id": 1,
        "photo_url": 'https://randomuser.me/api/portraits/women/1.jpg'
    })

    await security_information.insertOne({
        "employee_id": 2, 
        "username": faker.internet.userName({firstName: firstNameHR, lastName: lastNameHR}),
        "password": faker.internet.password(),
    });

    for (let i = 3; i < 100; i++) {
        const random_manager_id = Math.ceil(Math.random() * (i - 2));
        const random_selected_sex = (Math.random() < 0.5) ? "female" : "male"
        const firstName = faker.person.firstName(random_selected_sex);
        const lastName = faker.person.lastName();

        await employee_directory.insertOne({
            "id": i,
            "first_name": firstName,
            "last_name": lastName,
            "phone_number": faker.phone.number(),
            "job_role": faker.person.jobTitle(),
            "work_location": `${faker.location.city()}, ${faker.location.state({abbreviated: true})}`,
            "salary": faker.finance.amount(65000, 200000, 0, '$'),
            "manager_id": random_manager_id,
            "photo_url": `https://randomuser.me/api/portraits/${random_selected_sex === 'male' ? 'men' : 'women'}/${i}.jpg`
        });

        await security_information.insertOne({
            "employee_id": i,
            "username": faker.internet.userName({ firstName: firstName, lastName: lastName }),
            "password": faker.internet.password(),
        });
    }

    console.log("INSERTED Employees");
    res.send("Inserted Employees");
    client.close();
});

app.get("/search-all/:search_text", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');

    //     const searchResults = await employee_directory.find({ name: {$regex: req.params.search_text, $options: "xi"}}).toArray();
    const searchResults = await employee_directory.find({
        $or: [
            { first_name: { $regex: req.params.search_text, $options: "xi" } },
            { last_name: { $regex: req.params.search_text, $options: "xi" } },
            { work_location: { $regex: req.params.search_text, $options: "xi" } },
            { job_role: { $regex: req.params.search_text, $options: "xi" } }
        ]
    }).toArray();

    // console.log("Sending search results: ", searchResults);
    res.send(searchResults);
    client.close();
});

app.get("/search-name/:search_text", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');

    //     const searchResults = await employee_directory.find({ name: {$regex: req.params.search_text, $options: "xi"}}).toArray();
    const searchResults = await employee_directory.find({
        $or: [
            { first_name: { $regex: req.params.search_text, $options: "xi" } },
            { last_name: { $regex: req.params.search_text, $options: "xi" } }
        ]
    }).toArray();

    // console.log("Sending search results: ", searchResults);
    res.send(searchResults);
    client.close();
});

app.get("/search-job/:search_text", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');

    const searchResults = await employee_directory.find({ job_role: {$regex: req.params.search_text, $options: "xi"}}).toArray();

    // console.log("Sending search results: ", searchResults);
    res.send(searchResults);
    client.close();
});

app.get("/search-location/:search_text", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');

    const searchResults = await employee_directory.find({ work_location: {$regex: req.params.search_text, $options: "xi"}}).toArray();

    // console.log("Sending search results: ", searchResults);
    res.send(searchResults);
    client.close();
});

app.post("/employees/:employee_id", async (req, res) => {
    const employee_directory = await mongoConnect('employee_directory');
    const { signedInEmployee } = req.body;

    console.log('requestorId: ', signedInEmployee);
    const employee = await employee_directory.findOne({ id: +req.params.employee_id });
    const requestor = await employee_directory.findOne({ id: +signedInEmployee });
    const manager = await employee_directory.findOne({ id: +employee.manager_id });
    console.log("Sending employee: ", employee);
    res.send({
        "employee": employee,
        "requestor": requestor,
        "manager": manager
    });
    client.close();
});

app.post("/login", async (req, res) => {
    const security_information = await mongoConnect('security_information');
    const { username, password } = req.body;

    const securityInformation = await security_information.findOne({ username: username });

    if (securityInformation?.password === password) {
        console.log("Password is correct!");
        res.send({ "employee_id": securityInformation.employee_id });
    } else {
        console.log("Username or Password is incorrect!");
        res.sendStatus(401);
    }

    client.close();
});

app.get("/security/:employee_id", async (req, res) => {
    const security_information = await mongoConnect('security_information');

    const employeeSecurity = await security_information.findOne({ employee_id: +req.params.employee_id });

    console.log("Sending employee security information: ", employeeSecurity);
    res.send(employeeSecurity);
    client.close();
});

app.use(express.static('static'));

// start the rest service
var port = 3002;
console.log('service opening on port: ' + port)
app.listen(port);