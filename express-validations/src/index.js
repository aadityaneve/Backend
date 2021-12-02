const { app, start } = require("./server");

const userController = require("./controllers/user.controller");

app.use("/user", userController);

start();
