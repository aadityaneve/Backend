const mongoose = require("mongoose");
// var DateOnly = require("mongoose-dateonly")(mongoose);
const express = require("express");
const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/masai");
};

const User = require("./src/models/user.model");
const Student = require("./src/models/student.model");
const Instructor = require("./src/models/instructor.model");
const Topic = require("./src/models/topic.model");
const Eval = require("./src/models/evaluation.model");

app.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.post("/student", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.post("/instructor", async (req, res) => {
    try {
        const instructor = await Instructor.create(req.body);
        return res.status(201).send(instructor);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.post("/topic", async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        return res.status(201).send(topic);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.post("/eval", async (req,res) => {
    try {
        const eval = await Eval.create(req.body);
        return res.status(201).send(eval);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/students/topic_id=:topic_id", async (req, res) => {
    try {
        const eval = await Eval.find({ topic_id:req.params.topic_id })
            .populate("student_id")
            .populate(
                {
                    path: "student_id",
                    populate: {
                        path: "user_id",
                    }
                }
            )
            .populate("topic_id")
            .lean()
            .exec()
        return res.status(201).send(eval);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
})

app.get("/students/max-marks", async (req, res) => {
    try {
        const highestMarks = await Eval.find()
            .sort({ marks: -1 })
            .limit(3)
            .populate("student_id")
            .populate({
                path: "student_id",
                populate: {
                    path: "user_id",
                },
            })
            .populate("topic_id")
            .lean()
            .exec();
        return res.status(201).send(highestMarks);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.listen(3001, async () => {
    await connect();
    console.log("LISTENING ON PORT 3001");
});
