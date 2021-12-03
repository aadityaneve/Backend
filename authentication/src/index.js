const express = require("express");
const { register, login } = require("./controllers/auth.controller");
const { start, app } = require("./server");
app.use(express.json());

console.clear();
app.post("/register", register);
app.post("/login", login);

start();