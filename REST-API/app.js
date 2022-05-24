const fs = require('fs');
const express = require("express");
const DB = require('./REST-API-db.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const router = express.Router();

app.get('/members', (req, res, next) => {
    res.status(200).send({
        message: "GET 요청이 성공적으로 수행됨"
    });
    res.send()
});


fs.readFile('./REST-API-db.json', 'utf8', (error, jsonFile) => {
    if (error) return console.log(error);
    const jsonData = JSON.parse(jsonFile);

    const members = jsonData.members;
    members.forEach(member => {
        console.log(member);
        console.log(member.name);
    });
    const {id, password} = JSON.parse(body);
    for (let idx = 0; idx < members.length; idx++) {
        const member = members[idx];
        if (member.id === id) {
            if (member.password === password) {
                res.status(200).send("login success");
            }
        }
    }
    res.status(404).send('login failed');

    app.post('/members', (req, res, next) => {
        if (members.name === req.body.name) {
            if (members.password === req.body.password) {
                res.status(200).send("Login: Success");
            } else {
                res.status(404).send("Login: Fail");
            }
        }
    });
});

app.listen(3000, () => {
    console.log("starting server at port 3000..");
});





//
// fs.readFile('./REST-API-db.json', 'utf8', (error, jsonFile) => {
//     if (error) return console.log(error);
//     const jsonData = JSON.parse(jsonFile);
//
//     const members = jsonData.members;
//     members.forEach(member => {
//         console.log(member);
//         console.log(member.name);
//     });
// });

// app.post('/members', (req, res) => {
//     console.log(req.body);
//
//     fs.readFile('./REST-API-db.json', 'utf8', (error, jsonFile) => {
//         if (error) return console.log(error);
//         const jsonData = JSON.parse(jsonFile);
//
//         const members = jsonData.members;
//         members.forEach(member => {
//             // console.log(member);
//             // console.log(member.name);
//         });
//         const memberName =
//         if (members.name === req.name) {
//             if (members.password === req.password) {
//                 res.send("Login Success");
//             }
//         }
//         else {
//             res.send("Login Fail");
//         }
//     });
// });
