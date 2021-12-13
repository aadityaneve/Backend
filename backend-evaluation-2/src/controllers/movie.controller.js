const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');

router.post('/movie', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);

        return res.status(200).json({ status: 'Success', movie: movie });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/movies', async (req, res) => {
    try {
        const movie = await Movie.find(req.body).lean().exec();

        return res.status(200).json({ status: 'Success', movie: movie });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
