const { start, app } = require("./server");
const express = require("express");
app.use(express.json());

const productController = require("./controllers/product.controller");

app.use("/product", productController);

start();
