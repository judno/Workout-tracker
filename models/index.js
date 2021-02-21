const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  distance: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});
const Exercise = mongoose.model("Exercise", ExerciseSchema);

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});
WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (const e of this.exercises) {
    totalDuration += e.duration;
  }
  return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {
  Workout,
  Exercise,
};
