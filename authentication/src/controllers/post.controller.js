const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const { validationResult } = require("express-validator");

const postIt = async (req, res) => {
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

        const post = await Post.create(req.body);

        return res.status(201).json({ status: "Successfully Posted", post });
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
};

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, payload) => {
            if (err) return reject(err);
            return resolve(payload);
        });
    });
}

const getIt = async (req, res) => {
    try {
        const bearer = req.headers.authorization;
        if (!bearer || !bearer.startsWith("Bearer ")) {
            return res.send("Invalid Token");
        }
        const token = bearer.split("Bearer ")[1].trim();
        let decode = await verifyToken(token);
        // let decode = jwt.verify(token, process.env.JWT_ACCESS_KEY);

        console.log(decode.user._id);

        let id = mongoose.Types.ObjectId(`${decode.user._id}`);
        const post = await Post.find({ user_id: id });

        return res.status(201).json({ status: "All Of Your Post's", post });
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
    }
};

module.exports = { postIt, getIt };
