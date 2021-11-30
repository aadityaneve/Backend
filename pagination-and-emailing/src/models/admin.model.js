const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: false },
        email: { type: String, required: true },
    },
    {
        versionKey: false,
        timeStamp: true,
    }
);
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
