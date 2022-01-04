const express = require('express');
const router = express.Router();
const Seller = require('../models/seller.model');

router.post('/', async (req, res) => {
    try {
        const seller = await Seller.create(req.body);
        return res.status(201).json({ status: 'Success', seller });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const seller = await Seller.find();
        return res.status(200).json({ status: 'Success', seller });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
