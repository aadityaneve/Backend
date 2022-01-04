const Product = require('../models/product.model');
const express = require('express');
const router = express.Router();
const client = require('../config/redis');

router.get('/', (req, res) => {
    client.get('product', async (err, products) => {
        try {
            if (err) console.log(err);
            if (products)
                return res
                    .status(200)
                    .send({ cached_products: JSON.parse(products) });

            const allProducts = await Product.find().lean().exec();

            client.set('products', JSON.stringify(allProducts));

            return res
                .status(200)
                .json({ status: 'Success', products: allProducts });
        } catch (e) {
            return res
                .status(500)
                .json({ status: 'Failed', message: e.message });
        }
    });
});

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(200).json({ status: 'Inserted', product: product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
            .lean()
            .exec();
        return res.status(200).json({ status: 'Success', product: product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
            .lean()
            .exec();

        return res.status(200).json({ status: 'Updated', product: product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        )
            .lean()
            .exec();

        return res.status(200).json({ status: 'Deleted', product: product });
    } catch (e) {
        return res.status(500).json({ status: 'Failed', message: e.message });
    }
});

module.exports = router;
