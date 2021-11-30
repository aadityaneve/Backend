const express = require("express");
const router = express.Router();
const Product = require("../models/product.models");

router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(200).json({ product: product });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        let page = +req.query.page || 1;
        let size = +req.query.limit || 10;

        const offset = (page - 1) * size;

        const product = await Product.find({})
            .skip(offset)
            .limit(size)
            .lean()
            .exec();

        const totalPages = Math.ceil(
            (await Product.find({}).countDocuments().lean().exec()) / size
        );

        return res
            .status(200)
            .json({ products: product, total_pages: totalPages });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;
