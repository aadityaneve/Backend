const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

/*
    users

    post = /users
    get all = /users
    get one = /users/:id
    update one = /users/:id
    delete one = /users/:id
*/

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/movies");
};

// first_name: { type: String, required: true },
// last_name: { type: String, required: false },
// email: { type: String, required: true, unique: true }

const userSchema = new mongoose.Schema({
    movie_name: { type: String, unique: true },
    movie_genre: { type: String, required: true },
    production_year: { type: Number, required: true, default: 2021 },
    budget: { type: Number, required: true },
});

const Movies = mongoose.model("movie", userSchema);

app.get("/movies", async (req, res) => {
    try {
        const movie = await Movies.find().lean().exec();
        return res.status(200).send(movie);
    } catch (e) {
        return res.status(500).send({ message: e.message, status: "Failed" });
    }
});

app.post("/movies", async (req, res) => {
    try {
        const movie = await Movies.create(req.body);

        res.status(201).send(movie);
    } catch (e) {
        res.status(500).send({ message: e.message, status: "Failed" });
    }
});

app.get("/movies/:id", async (req, res) => {
    const movie = await Movies.findById(req.params.id).lean().exec();

    res.send({ movie });
});

app.patch("/movies/:id", async (req, res) => {
    try {
        const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();

        return res.status(200).send({ movie });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.delete("/movies/:id", async (req, res) => {
    try {
        const movie = await Movies.findByIdAndDelete(req.params.id)
            .lean()
            .exec();

        return res.status(200).send({ movie });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.listen(3001, async () => {
    await connect();
    console.log("Listening on port 3001");
});