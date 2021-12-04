const express = require("express");
const { check, body, validationResult } = require("express-validator");
const { register, login } = require("./controllers/auth.controller");
const { start, app } = require("./server");
app.use(express.json());

console.clear();
app.post(
    "/register",
    check("first_name")
        .isLength({ min: 3 })
        .withMessage("Name Should Be Minimum 3 Characters."),
    check("last_name")
        .isLength({ min: 2 })
        .withMessage("Last Name Should Be Min 2 Characters."),
    check("email").isEmail().withMessage("Enter Valid Email."),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password Must Be 6 Characteres Long."),
    register
);

app.post(
    "/login",
    check("email").isEmail().withMessage("Enter Valid Email."),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password Must Be 6 Characteres Long."),
    login
);

start();
