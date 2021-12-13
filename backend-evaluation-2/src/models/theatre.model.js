const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Theatre = mongoose.model('theatre', theatreSchema);

module.exports = Theatre;
