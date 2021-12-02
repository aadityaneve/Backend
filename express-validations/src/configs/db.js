const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();

const connect = () => {
    return mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aiizm.mongodb.net/express-validations`
    );
};

module.exports = connect;
