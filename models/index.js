const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// type: "resistance",
//         name: "Military Press",
//         duration: 20,
//         weight: 300,
//         reps: 10,
//         sets: 4

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
