const connect = require("./configs/db");
const express = require("express");
const app = express();

const start = async () => {
    await connect();
    app.listen(3001, () => {
        console.log("LISTENING ON SERVER 3001.");
    });
};

module.exports = { app, start };
