import express from "express";
import { getUser, userLogin, userLogout, userRegister } from "../controllers/userContorller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", isAuthenticated, userLogout);
userRouter.get("/getuser", isAuthenticated, getUser);

export default userRouter;
