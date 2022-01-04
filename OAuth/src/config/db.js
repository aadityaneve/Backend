require("dotenv").config();
const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(
        `mongodb+srv://aadityaneve:${process.env.MONGODB_KEY}@cluster0.aiizm.mongodb.net/OAuth`
    );
};

module.exports = connect;
