const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(
        "mongodb+srv://aadityaneve:aadityaneve12$@cluster0.aiizm.mongodb.net/user-file-upload"
    );
};

module.exports = connect;
