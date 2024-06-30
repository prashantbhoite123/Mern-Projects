import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

export const Task = mongoose.model("Task", TaskSchema)
