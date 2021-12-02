const express = require("express");
const Galary = require("../models/galary.model");
const upload = require("../middlewares/upload.middleware");
const router = express.Router();

router.post("/", upload.array("picture_urls", 5), async (req, res) => {
    try {
        const filePath = req.files.map((file) => file.path);

        const galary = await Galary.create({
            picture_urls: filePath,
            user_id: req.body.user_id,
        });
        return res.status(201).json({ user: galary });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;
