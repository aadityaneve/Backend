const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model');

router.post('/seat', async (req, res) => {
    try {
        const seat = await Seat.create();

        return res.status(201).json({ status: 'Success', seat: seat });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/seats', async (req, res) => {
    try {
        const seat = await Seat.find().lean().exec();

        return res.status(200).json({ status: 'Success', seat: seat });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
