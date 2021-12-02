const mongoose = require("mongoose");

const galarySchema = new mongoose.Schema(
    {
        picture_urls: [{ type: String, required: false }],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Galary = mongoose.model("galary", galarySchema);

module.exports = Galary;