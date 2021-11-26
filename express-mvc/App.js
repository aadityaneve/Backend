const mongoose = require("mongoose");
// var DateOnly = require("mongoose-dateonly")(mongoose);
const express = require("express");
const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/masai");
};

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: false },
        gender: { type: String, required: false, default: "Male" },
        dob: { type: Date, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const User = mongoose.model("user", userSchema);

const studentSchema = new mongoose.Schema(
    {
        roll_id: { type: Number, required: true },
        current_batch: { type: String, required: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Student = mongoose.model("student", studentSchema);

const instructorSchema = new mongoose.Schema(
    {
        instructor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Instructor = mongoose.model("instructor", instructorSchema);

const topicSchema = new mongoose.Schema(
    {
        topic_name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Topic = mongoose.model("topic", topicSchema);

const evaluationSchema = new mongoose.Schema(
    {
        date_of_eval: { type: Date, required: true },
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
            required: true,
        },
        topic_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "topic",
            required: true,
        },
        marks: { type: Number, required: false, default: 0 },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Eval = mongoose.model("evaluation", evaluationSchema);

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
