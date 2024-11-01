import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskSchema.js";

export const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description, status, priority } = req.body;

  if (!title) {
    return next(new ErrorHandler("Task Title Is Mandatory.", 400));
  }
  const newTask = await Task.create({
    createdBy: req.user,
    title,
    description,
    status,
    priority,
  });

  res.status(200).json({
    success: true,
    message: "New Task Added.",
    task: newTask,
  });
});

export const getSingleTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Oops! Task Not Found.", 404));
  }
  res.status(200).json({
    success: true,
    task,
  });
});

export const getTask = catchAsyncErrors(async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.user });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task Not Found.", 404));
  }

  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task Successfully Deleted.",
  });
});

export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateTaskData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  };

  const task = await Task.findByIdAndUpdate(id, updateTaskData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!task) {
    return next(new ErrorHandler("Task Not Found or You are not authorized to update this task.", 404));
  }
  res.status(200).json({
    success: true,
    message: "Task Updated Successfully.",
    task,
  });
});
