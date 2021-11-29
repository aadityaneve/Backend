const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri");
};

const jobsSchema = new mongoose.Schema(
    {
        job_name: { type: String, required: true },
        work_from_home: { type: Boolean, required: false, default: true },
        notice_period: { type: String, required: true, default: "2m" },
        rating: { type: Number },
        city_name: { type: String, required: true },
        vacancy: { type: Boolean, required: true },
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Job = new mongoose.model("job", jobsSchema);

const companySchema = new mongoose.Schema(
    {
        company_name: { type: String, required: true },
        company_address: { type: String, required: true },
        company_contact: { type: Number, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Company = new mongoose.model("company", companySchema);

const skillSchema = new mongoose.Schema(
    {
        skill: { type: String },
        job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "job",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const Skill = new mongoose.model("skill", skillSchema);

app.post("/company", async (req, res) => {
    try {
        const company = await Company.create(req.body);
        return res.status(201).send(company);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.post("/job", async (req, res) => {
    try {
        const job = await Job.create(req.body);
        return res.status(201).send(job);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.post("/skill", async (req, res) => {
    try {
        const job = await Skill.create(req.body);
        return res.status(201).send(job);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/jobs/skill=:skill", async (req, res) => {
    try {
        const jobs = await Skill.find({ skill: req.params.skill });
        return res.status(201).send(jobs);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/jobs/work-form-home", async (req, res) => {
    try {
        const jobs = await Job.find({ work_from_home: true });
        return res.status(201).send(jobs);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/jobs/notice-period", async (req, res) => {
    try {
        const jobs = await Job.find({ notice_period: "2m" });
        return res.status(201).send(jobs);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/jobs/sort-by-rating", async (req, res) => {
    try {
        const jobs = await Job.find({}).sort({ rating: -1 });
        return res.status(201).send(jobs);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/jobs/company-details=:companyId", async (req, res) => {
    try {
        const companies = await Company.findById(req.params.companyId);
        return res.status(201).send(companies);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.get("/jobs/vacancy", async (req, res) => {
    try {
        const jobs = await Job.find({}).sort({ vacancy: true });
        return res.status(201).send(jobs);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.listen(3001, async () => {
    await connect();
    console.log("LISTENING ON SERVER 3001.");
});
