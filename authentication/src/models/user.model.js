const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// We are using mongoose save hook here
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
    });
});

// checking for password
userSchema.methods.checkPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err, same) {
            if (err) return reject(err);
            return resolve(same);
        });
    });
};

const User = model("user", userSchema);

module.exports = User;
