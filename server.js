const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { Workout, Exercise } = require("./models");

app.use(express.json());

const WEEK = 1000 * 60 * 60 * 24 * 7;

mongoose.set("toJSON", { virtuals: true });

async function run() {
  app.use(express.static("public"));

  app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });
  app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
  });

  app.get("/api/workouts", async function (req, res) {
    const workouts = await Workout.find({}).populate("exercises");
    console.log(workouts);

    res.json(workouts);
  });

  app.put("/api/workouts/:id", async function (req, res) {
    const newExercise = await Exercise.create(req.body);

    const targetWorkout = await Workout.findById(req.params.id);
    targetWorkout.exercises.push(newExercise._id);

    await targetWorkout.save();

    res.json(newExercise);
  });
  app.post("/api/workouts", async function (req, res) {
    const newWorkout = await Workout.create(req.body);

    res.json(newWorkout);
  });

  app.get("/api/workouts/range", async (req, res) => {
    const workoutRange = await Workout.find({
      day: { $gte: Date.now() - WEEK },
    }).populate("exercises");

    res.json(workoutRange);
  });

  await mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.listen(8080);
}

run();
