const express = require("express");
const users = require("./users.json");
const app = express();

app.use(express.json());

/* REST API : Representational State Transfer
    HTTP VERBS

    GET
    POST
    PATCH / PUT
    DELETE
*/

app.get("/", (req, res) => {
    res.send(200, users);
});

app.get("/users/all", (req, res) => {

    let a = {};
    a.name = "Aditya";
    a.name = "Neve"
    res.json(200, { users }, a);
});

app.post("/users", (req, res) => {
    // console.log(req.body);
    const newUsers = [...users, req.body];
    res.send(newUsers);
});

// optional channing - null safety

app.patch("/users/:id", (req, res) => {
    console.log(req.params);
    const newUser = users.map((user) => {
        if (req.params.id == user.id) {
            return req.body;
        }
        return user;
    });
    res.send(newUser);
});

app.delete("/users/:id", (req, res) => {    
    console.log(req.params);
    const newUser = users.map((user) => {
        if (req.params.id != user.id) {
            // console.log(user.id);
            return user;
        }
    });
    res.send(newUser);
});

app.get("/users/:id", (req, res) => {
    console.log(req.params.id);
    const newUsers = users.filter((user) => user.id == req.params.id);
    res.send(newUsers);
});

app.listen(3001, () => {
    console.log("Listening On PORT 3001");
});
