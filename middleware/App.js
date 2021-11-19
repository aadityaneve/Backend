const express = require("express");
const app = express();

// Express cant read json file thats whiy we have to use this command
app.use(express.json());

const authenticate = (req, res, next) => {
    console.log("Before");
    next();
    console.log("After");
};

const authority = (person) => {
    if (person === "Aaditya") {
        return (req, res, next) => {
            console.log("Before: Has Authority");
            next();
            console.log("After: Has Authority");
        };
    }else {
        return (req, res, next) => {
            console.log("Before: UnAuthorized");
            next();
            console.log("After: UnAuthorized");
        }
    }
};

app.get("/", (req, res) => {
    res.send("Data For Users");
});

app.get("/login", [authenticate, authority("Aadityaa")], (req, res) => {
    res.send("Successfully Logged In");
});

app.listen(3001, (req, res) => {
    console.log("Listening To PORT 3001");
});
