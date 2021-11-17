/* 
    Problem
    Please create an http server and you can use the users.json 
    by downloading it from mockaroo.com and you need to write following apis

    get / => this will return simple text "Welcome to Home page"
    get /users => this will return a list of all users
*/

const data = require("./MOCK_DATA.json");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    return res.send("<h1>Welcome to Home page</h1>");
});

// res.setHeader('Content-Type', 'text/html');
app.get("/users", (req, res) => {
    res.set("Content-Type", "text/html");
    data.forEach(({ first_name: firstName, last_name: lastName, email: email }) => {
            res.write(`<h3> ${firstName} ${lastName} ${email} </h3>`);
        });
    res.end();
});

app.listen(2345, () => {
    console.log("Listening port 2345");
});

/*
app.get("/", (req, res) => {
    const a = {};
    a.name = "Aditya Neve";
    return res.send(a);
});
*/

// REST API
/*  HTTP VERBS
    GET - get all items
    GET - get single item
    POST - create a single item
    PATCH / PUT - update a single item
    DELETE - delete a single item
*/

/* 
    PUT - is replace
    PATCH - is modify
*/

// GRAPH QL -> LATEST

// port is a logical gate into your computer
