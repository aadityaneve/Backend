const express = require('express');
const router = express.Router();
const Show = require('../models/show.model');
const Screen = require('../models/screen.model');
const Theatre = require('../models/theatre.model');

router.post('/theatre', async (req, res) => {
    try {
        console.log(req.body);
        const theatre = await Theatre.create(req.body);

        return res.status(201).json({ status: 'Success', theatre: theatre });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.post('/screen', async (req, res) => {
    try {
        const screen = await Screen.create(req.body);

        return res.status(201).json({ status: 'Success', screen: screen });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.post('/shows', async (req, res) => {
    try {
        const show = await Show.create(req.body);

        return res.status(201).json({ status: 'Success', show: show });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/shows/:movie_id', async (req, res) => {
    try {
        const show = await Show.find({ movie_id: req.params.movie_id })
            .populate('movie_id')
            .populate('screen_id')
            .populate({
                path: 'screen_id',
                populate: {
                    path: 'threatre_id',
                },
            })
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
            $and: [{ movie_id: req.params.movie_id }],
        })
            .lean()
            .exec();

        return res.status(200).json({ status: 'Success', show: show });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
