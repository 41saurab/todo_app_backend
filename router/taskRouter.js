import express from "express";
import { createTask, deleteTask, getSingleTask, getTask, updateTask } from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", isAuthenticated, createTask);

taskRouter.get("/:id", isAuthenticated, getSingleTask);

taskRouter.get("/alltasks", isAuthenticated, getTask); // Changed to /alltasks

taskRouter.delete("/delete/:id", isAuthenticated, deleteTask);

taskRouter.put("/update/:id", isAuthenticated, updateTask);

export default taskRouter;
