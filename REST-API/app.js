const fs = require('fs');
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/members', (req,
                     res, next) => {
    res.status(200).send({
        message: "GET 요청이 성공적으로 수행됨"
    });
    console.log("GET 요청이 수행됨");
    res.send()
});

app.post('/members', (req,
                      res) => {
    console.log("POST 요청이 수행됨");
    console.log(req.body);  //body 내용을 콘솔에 출력

    fs.readFile('./REST-API-db.json', 'utf8',
        (error, jsonFile) => {
        if (error) return console.log(error);
        const jsonData = JSON.parse(jsonFile); //db.json을 string형으로 변환하여 jsonData에 저장

        const members = jsonData.members; //db.json에서 members를 members변수에 저장
        const {name, password} = req.body;

        for (let idx = 0; idx < members.length; idx++) {
            const member = members[idx];
            if (member.name === name) {                //로그인 시 name이 일치하면
                if (member.password === password) {    //로그인 시 password가 일치하면
                    return res.status(200).send("login success"); //로그인 성공
                }
            }
        }
        res.status(404).send("login failed"); //둘 중 하나라도 틀리면 로그인 실패
    });
});

app.listen(3000, () => {
    console.log("starting server at port 3000..");
});



// fs.readFile('./REST-API-db.json', 'utf8', (error, jsonFile) => {
//     if (error) return console.log(error);
//     const jsonData = JSON.parse(jsonFile);
//
//     const members = jsonData.members;
//     members.forEach(member => {
//         console.log(member);
//         console.log(member.name);
//     });
//     const {id, password} = JSON.parse(body);
//     for (let idx = 0; idx < members.length; idx++) {
//         const member = members[idx];
//         if (member.id === id) {
//             if (member.password === password) {
//                 res.status(200).send("login success");
//             }
//         }
//     }
//     res.status(404).send('login failed');
//
//     app.post('/members', (req, res, next) => {
//         if (members.name === req.body.name) {
//             if (members.password === req.body.password) {
//                 res.status(200).send("Login: Success");
//             } else {
//                 res.status(404).send("Login: Fail");
//             }
//         }
//     });
// });


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
