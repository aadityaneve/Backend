const mongoose = require('mongoose');

const movieSchama = new mongoose.Schema(
    {
        name: { type: String, required: true },
        actors: [{ type: String, required: true }],
        languages: [{ type: String, required: true }],
        directors: [{ type: String, required: true }],
        poster_url: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Movie = mongoose.model('movie', movieSchama);

module.exports = Movie;
