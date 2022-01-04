const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Seller = mongoose.model('seller', sellerSchema);

module.exports = Seller;
