import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Is Required."],
    minLength: [2, "Username must be at least 2 characters."],
    maxLength: [32, "Username can not exceed 32 characters."],
  },
  email: {
    type: String,
    required: [true, "Email Is Required."],
    validate: [validator.isEmail, "Please Provide A Valid Email."],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 2 characters."],
    maxLength: [32, "Password can not exceed 32 characters."],
    select: false,
  },
  createdAt: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

export const User = mongoose.model("User", userSchema);
