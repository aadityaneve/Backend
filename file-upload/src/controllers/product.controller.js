const express = require("express");
const Product = require("../models/product.model");
const upload = require("../middlewares/upload.middleware");
const router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "./src/uploads/" });

router.post("/", upload.single("image_urls"), async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls: req.file.path,
        });
        return res.status(200).json({ product: product });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

router.post("/multiple", upload.any("image_urls"), async (req, res) => {
    try {
        const filePath = req.files.map((file) => file.path);

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls: filePath,
        });
        return res.status(200).json({ product: product });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;
