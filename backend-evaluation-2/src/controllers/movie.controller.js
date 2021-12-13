const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middlewares/upload.middleware');
const Movie = require('../models/movie.model');

router.post('/movie', [upload.single('poster_url')], async (req, res) => {
    try {
        const movie = await Movie.create({
            name: req.body.name,
            actors: req.body.actors,
            languages: req.body.languages,
            directors: req.body.directors,
            poster_url: req.file.path,
        });

        return res.status(200).json({ status: 'Success', movie: movie });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/movies', async (req, res) => {
    try {
        const movie = await Movie.find().lean().exec();

        return res.status(200).json({ status: 'Success', movie: movie });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
