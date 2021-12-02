const { start, app } = require("./server");
const express = require("express");
app.use(express.json());

const productController = require("./controllers/product.controller");
const userController = require("./controllers/user.controller");
const galaryController = require("./controllers/galary.controller");

app.use("/product", productController);
app.use("/user", userController);
app.use("/galary", galaryController);

start();
