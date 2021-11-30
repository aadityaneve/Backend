const express = require("express");
const router = express.Router();
const Admin = require("../models/admin.model");

router.post("/", async (req, res) => {
    try {
        const admin = await Admin.create(req.body);

        return res.status(200).json({ admin: admin });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const admin = await Admin.find({});

        return res.status(200).json({ admin: admin });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;
