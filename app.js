import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import { dbConnection } from "./database/dbConnection.js";
import taskRouter from "./router/taskRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
