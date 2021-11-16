const express = require("express");
const app = express();

// get :- retriever a list of something or single item
// post :- save something on the server or the db
// put / patch :- update an item, put replaces the item and patch appends to it
// delete :- when you want to delete an item

// middleware to parse request body
// app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page Get Request");
});

app.post("/", (req, res) => {
    res.status(200).json(req.body);
    console.log("Home Page Post Request");
});

/*
function logger(req, res, next) {
    console.log("Logging Before");
    next(); // no a return statement
    console.log("Logging After");
}
*/

app.listen(1234, () => {
    console.log("Listening on port 1234");
});