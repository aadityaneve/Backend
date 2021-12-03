require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
    try {
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

const login = (req, res) => {
    try {

        // check if the provided email address is already exist

        // if it does not exist then throw an error

        // else we match the password

        // if not match then throw an error

        // if it matches then create the token
        
        res.status(201).send("Logged In Successfully.");
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
};

module.exports = { register, login };
