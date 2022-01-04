require('dotenv').config();
const jwt = require('jsonwebtoken');

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_ACCESS_KEY);
};

module.exports = newToken;
