const express = require("express");
const User = require("../models/user.model");
const Galary = require("../models/galary.model");
const upload = require("../middlewares/upload.middleware");
const fs = require("fs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post("/", upload.single("profile_pic_url"), async (req, res) => {
    try {
        /* Regular Expression */
        // const regExp = new RegExp(/^[0-9]+$/);
        // console.log(regExp.test(12345))
        /* Regular Expression */

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newErrors = errors.array().map(({ msg, param, location }) => {
                return {
                    [param]: msg,
                };
            });
            return res.status(400).send({ errors: newErrors });
        }

        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic_url: req.file.path,
        });
        return res.status(201).json({ user: user });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

router.patch(
    "/update=:user_id",
    upload.single("profile_pic_url"),
    async (req, res) => {
        try {
            const itemUrl = await User.findById(req.params.user_id);
            fs.unlink(`${itemUrl.profile_pic_url}`, async (err) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    console.log(
                        `${itemUrl.profile_pic_url} IS DELETED SUCCESSFULLY.`
                    );
                }
            });

            const user = await User.findByIdAndUpdate(`${req.params.user_id}`, {
                profile_pic_url: req.file.path,
            });
            return res.status(201).json({ updated_user: user });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }
);

router.delete("/delete=:user_id", async (req, res) => {
    try {
        /* will delete profile pic of user */
        const userProfile = await User.findById(req.params.user_id);
        console.log("userProfile:", userProfile);

        fs.unlink(`${userProfile.profile_pic_url}`, async (err) => {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log(
                    `${userProfile.profile_pic_url} IS DELETED SUCCESSFULLY.`
                );
            }
        });
        /* will delete profile pic of user */

        /* will delete galary pics of user */
        // mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
        let id = mongoose.Types.ObjectId(req.params.user_id);
        console.log(id);
        const userGalary = await Galary.findOne({
            user_id: id,
        });
        console.log("User_Galary : ", userGalary);
        userGalary.picture_urls.forEach((userPic) => {
            fs.unlink(`${userPic}`, async (err) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    console.log(`${userPic} IS DELETED SUCCESSFULLY.`);
                }
            });
        });
        /* will delete galary pics of user */

        /* will delete galary of user */
        const galary = await Galary.deleteOne({ user_id: id });
        /* will delete galary of user */

        /* will delete that user from user collection*/
        const user = await User.deleteOne({ _id: req.params.user_id });
        /* will delete that user from user collection*/

        return res
            .status(201)
            .json({ deleted_user: user, deleted_galary: galary });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;
