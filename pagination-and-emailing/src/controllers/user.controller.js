const express = require("express");
const transporter = require("../configs/mail");
const router = express.Router();
const User = require("../models/user.model");
const Admin = require("../models/admin.model");

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);

        const admins = await Admin.find({}).lean().exec();
        admins.forEach(({ email }) => {
            const mail = {
                from: `${req.body.email}`,
                to: `${email}`,
                subject: `${req.body.first_name} ${req.body.last_name} has registered with us`,
                text: `Please welcome ${req.body.first_name} ${req.body.last_name}`,
                html: "<h1>Some description about the user....</h1>",
            };

            transporter.sendMail(mail);
        });

        // to :- {user.email}
        // subject :- Welcome to ABC system {user.first_name} {user.last_name}
        // text :- Hi {first_name}, Please confirm your email address

        // let transporter = nodemailer.createTransport({
        //     sendmail: true,
        //     newline: "unix",
        //     path: "/usr/sbin/sendmail",
        // });
        // transporter.sendMail(
        //     {
        //         from: "sender@example.com",
        //         to: "recipient@example.com",
        //         subject: "Message",
        //         text: "I hope this message gets delivered!",
        //     },
        //     (err, info) => {
        //         console.log(info.envelope);
        //         console.log(info.messageId);
        //     }
        // );

        return res.status(200).json({ user: user });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const user = await User.find({});

        return res.status(200).json({ user: user });
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

module.exports = router;
