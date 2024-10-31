import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const userRegister = catchAsyncErrors(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorHandler("Please Provide All Details.", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email already exists.", 400));
    }

    const userData = { username, email, password };

    const user = await User.create(userData);
    sendToken(user, 200, res, "User Successfully Registered.");
  } catch (error) {
    next(error);
  }
});

export const userLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("All Fields Are Required.", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    sendToken(user, 200, res, "User Successfully Logged In.");
  } catch (error) {
    next(error);
  }
});

export const userLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "User Successfully Logged Out.",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
