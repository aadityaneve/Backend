const express = require("express");
const User = require("../models/user.model");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.post(
    "/",
    [
        check("first_name")
            .isLength({ min: 3 })
            .withMessage("Name should be minimum 3 characters."),
        check("last_name")
            .isLength({ min: 2 })
            .withMessage("Last name should be min 2 characters or type NA."),
        check("email").isEmail().withMessage("Enter valid email"),
        check("pincode")
            .isNumeric()
            .isLength({ min: 6, max: 6 })
            .withMessage("Pincode must be of 6 digits."),
        check("age")
            .isNumeric()
            .custom(async (value) => {
                if (value < 0 || value > 110) {
                    throw new Error("Please enter age between 1 - 110");
                }
                return true;
            }),
        check("gender")
            .toLowerCase()
            .isIn(["male", "female", "trans", "other"])
            .withMessage("Please enter valid gender."),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let newErrors = errors
                    .array()
                    .map(({ msg, param, location }) => {
                        return {
                            [param]: msg,
                        };
                    });
                return res.status(400).send({ errors: newErrors });
            }

            const user = await User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                pincode: req.body.pincode,
                age: req.body.age,
                gender: req.body.gender,
            });
            return res.status(201).json({ user: user });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }
);

module.exports = router;
