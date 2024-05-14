import User from "../models/userSchema.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const adminLogin = asyncHandler(async (req, res) => {
  console.log(req.body, "hellooo");
  const { email, password } = req.body;
  const adminInfo = await User.findOne({ isAdmin: 1, email: email });

  if (!adminInfo) {
    res.status(400);
    throw new Error("Invalid Admin");
  }

  const passwordMatch = await bcrypt.compare(password, adminInfo.password);

  if (passwordMatch) {
    generateToken(res, adminInfo._id);
    res.status(200).json(adminInfo);
  } else {
    res.status(400);
    throw new Error("Password is incorrect");
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  console.log("list user invoked");
  const users = await User.find({ isAdmin: { $ne: 1 } });
  res.status(200).json(users);
});

const editUser = asyncHandler(async (req, res) => {
  const id = req.body.userForEdit._id;

  const body = req.body;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("Invalid Id");
  }

  user.username = body.username || user.username;
  user.email = body.email || user.email;
  user.phone = body.phone || user.phone;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

const deletUser = asyncHandler(async (req, res) => {
  const id = req?.body?._id;
  const user = await User.findByIdAndDelete(id);

  res.status(200).json(user);
});

export { adminLogin, adminLogout, getAllUsers, editUser, deletUser };
