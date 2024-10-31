import moment from "moment";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Task Title Is Mandatory."],
    minLength: [2, "Title must be at least 2 characters."],
    maxLength: [32, "Title cannot exceed 32 characters."],
  },
  description: {
    type: String,
    minLength: [2, "Description must be at least 2 characters."],
    maxLength: [32, "Description cannot exceed 32 characters."],
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  createdAt: {
    type: String,
    default: () => moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  updatedAt: {
    type: String,
    default: () => moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

export const Task = mongoose.model("Task", taskSchema);
