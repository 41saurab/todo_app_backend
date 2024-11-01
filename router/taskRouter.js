import express from "express";
import { createTask, deleteTask, getSingleTask, getTask, updateTask } from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", isAuthenticated, createTask);
taskRouter.get("/get/:id", isAuthenticated, getSingleTask);
taskRouter.delete("/delete/:id", isAuthenticated, deleteTask);
taskRouter.put("/update/:id", isAuthenticated, updateTask);
taskRouter.get("/alltasks", isAuthenticated, getTask);

export default taskRouter;
