const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ status: 'Success', product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const product = await Product.find({});
        return res.status(200).json({ status: 'Success', product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.patch('/', async (req, res) => {
    try {
        const product = await Product.updateOne();
        return res.status(200).json({ status: 'Success', product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const product = await Product.deleteOne();
        return res.status(200).json({ status: 'Success', product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
