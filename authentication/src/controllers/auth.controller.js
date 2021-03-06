require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { validationResult } = require("express-validator");

const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
    try {
        /* Validations */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newErrors = errors.array().map(({ msg, param, location }) => {
                return {
                    [param]: msg,
                };
            });
            return res.status(400).send({ errors: newErrors });
        }
        /* Validations */

        // check if the email address provided already exists
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        // if it already exists then throw and error
        if (user) {
            return res.status(400).json({
                status: "failed",
                message:
                    "E-Mail Already Registered.Please Provide Different E-Mail Address.",
            });
        }

        // else we will create the user &&
        // we will HASH the password as plain text password is harmful
        user = await User.create(req.body);

        // we will create the token
        const token = newToken(user);

        // return the user and the token
        res.status(201).send("Registered Successfully.");
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
};

const login = async (req, res) => {
    try {
        // check if the provided email address is already exist
        let user = await User.findOne({ email: req.body.email });

        // if it does not exist then throw an error
        if (!user) {
            return res.status(400).json({
                status: "Failed",
                message: "This E-Mail Is Not Registered.",
            });
        }

        // else we match the password
        const matchPassword = await user.checkPassword(req.body.password);

        // if not match then throw an error
        if (!user) {
            return res.status(400).json({
                status: "Failed",
                message: "E-Mail Address Or Password Incorrect.",
            });
        }

        // if it matches then create the token
        const token = newToken(user);

        res.status(201).json({
            message: "Logged In Successfully.",
            user,
            token,
        });
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
};

module.exports = { register, login };
