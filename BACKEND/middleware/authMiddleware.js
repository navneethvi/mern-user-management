import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const isUserLogged = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});


export { isUserLogged };
