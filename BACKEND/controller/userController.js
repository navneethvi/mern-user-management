import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";

const securePassword = async (password) => {
  try {
    const passwordHash = bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const userRegister = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { username, email, phone, password, confirmPassword, image } = req.body;

  const userExists = await User.findOne({ email });
  console.log(password, confirmPassword);
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password not match");
  } else {
    console.log("heree");
    const passwordHash = await securePassword(password);

    const newUser = new User({
      username: username,
      email: email,
      phone: phone,
      password: passwordHash,
      image: image,
    });
    await newUser.save();
    generateToken(res, newUser._id);
    console.log("User Registered Successfully");
    res.json(newUser);
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("ivde ethi", req.body);
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    console.log("1here");
    if (passwordMatch) {
      console.log("User Logged in");
      generateToken(res, userExists._id);
      res.status(201).json(userExists);
    } else {
      res.status(400).json("Invalid Email or Password")
      throw new Error("Password is incorrect");

    }
  }else {
    res.status(400).json("No user found");
  }
});

const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userInfo = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    phone: req.user.phone,
  };
  res.status(200).json(userInfo);
});

const editUserProfile = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.user._id);
  if (userExists) {
    userExists.username = req.body.username || userExists.username;
    userExists.email = req.body.email || userExists.email;
    userExists.phone = req.body.phone || userExists.phone;
    if (req.body.password) {
      const passwordHash = await securePassword(req.body.password);
      userExists.password = passwordHash;
    }
    await userExists.save();
    res.status(200).json({
      _id: userExists._id,
      username: userExists.username,
      email: userExists.email,
      phone: userExists.phone,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { userRegister, userLogin, userLogout, getUserProfile, editUserProfile };
