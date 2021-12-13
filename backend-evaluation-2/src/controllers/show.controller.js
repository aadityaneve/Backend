const express = require('express');
const router = express.Router();
const Show = require('../models/show.model');

router.get('/shows/:movie_id', async (req, res) => {
    try {
        const show = await Show.find({ movie_id: req.params.movie_id })
            .lean()
            .exec();

        return res.status(200).json({ status: 'Success', show: show });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/shows/nearest/:movie_id', async (req, res) => {
    try {
        const show = await Show.find({
            $and: [{ movie_id: req.params.movie_id }, { total_seats }],
        })
            .lean()
            .exec();

        return res.status(200).json({ status: 'Success', show: show });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
