const fs = require('fs');
const express = require("express");
const {json} = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/signUp', (req,
                     res) => {
    console.log("POST /signUp");

    fs.readFile('./members.json', 'utf8',
        (error, jsonFile) => {
            if (error) return console.log(error);
            const jsonData = JSON.parse(jsonFile); //members.json을 string형으로 변환하여 jsonData에 저장

            const {name, password} = req.body;

            for (let idx = 0; idx < jsonData.length; idx++) {
                const member = jsonData[idx];
                if (member.name === name) {
                    if (member.password === password) {
                        console.log("SignUp Failed - already exists");
                        return res.status(404).send("SignUp Failed - already exists");
                    }
                }
            }
            jsonData.push(req.body);

            fs.writeFile('./members.json', JSON.stringify(jsonData,null,4),
                "utf8", (err) => {

                    if (error) return console.log(error);
                    console.log(" SignUp Success");
                    res.status(200).send("SignUp Success");
                });
        });
});

app.post('/login', (req,
                    res) => {
    console.log("POST /login");

    fs.readFile('./members.json', 'utf8',
        (error, jsonFile) => {
            if (error) return console.log(error);
            const jsonData = JSON.parse(jsonFile); //members.json을 string형으로 변환하여 jsonData에 저장

            const {name, password} = req.body;

            for (let idx = 0; idx < jsonData.length; idx++) {
                const member = jsonData[idx];
                if (member.name === name) {                //로그인 시 name이 일치하면
                    if (member.password === password) {    //로그인 시 password가 일치하면
                        console.log("Login Success");
                        return res.status(200).send("Login Success"); //로그인 성공
                    }
                }
            }
            console.log("Login failed");
            res.status(404).send("Login failed"); //둘 중 하나라도 틀리면 로그인 실패
        });
});

//아래는 리뷰를 작성하는 코드
app.post('/reviews', (req
    ,res )=> {
    console.log("POST /reviews");

    fs.readFile('./members.json', 'utf8',
        (error, jsonFile) => {
            if (error) return console.log(error);
            const jsonData = JSON.parse(jsonFile); //members.json을 string형으로 변환하여 jsonData에 저장

            const {name, password} = req.body;

            for (let idx = 0; idx < jsonData.length; idx++) {
                const member = jsonData[idx];
                if (member.name === name) {                //로그인 시 name이 일치하면
                    if (member.password === password) {    //로그인 시 password가 일치하면
                        console.log("Login Success - review upload");

                        fs.readFile('./reviews.json', 'utf8',
                            (error, reviewsFile) => {
                                if (error) return console.log(error);

                                const reviewData = JSON.parse(reviewsFile); //members.json을 string형으로 변환하여 jsonData에 저장

                                //아래처럼 원하는 정보만 빼내어, 추가하려 했으나 실패
                                //const {star_ratings, writer, comments} = req.body;
                                reviewData.push(req.body);

                                fs.writeFile('./reviews.json', JSON.stringify(reviewData,null, 4),
                                    "utf8", (error) => {

                                        if (error) return console.log(error);
                                        return res.status(200).send("review upload");
                                    });
                            });
                    }
                }
            }
        });
});

app.get('/reviews', (req,
                     res, next) => {
    console.log("GET /reviews");
    // res.status(200).send("GET /reviews");
    fs.readFile('./reviews.json', 'utf8',
        (error, reviewsFile) => {
            if (error) return console.log(error);

            const reviewData = JSON.parse(reviewsFile);

            res.status(200).send(reviewData);
        });
});

app.listen(3000, () => {
    console.log("starting server at port 3000..");
});