import express from "express";
import { isUserLogged } from "../middleware/authMiddleware.js";
import { upload } from "../multer/multer.js";

const Router = express.Router();
import {
  userRegister,
  userLogin,
  userLogout,
  getUserProfile,
  editUserProfile,
} from "../controller/userController.js";

Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.post("/logout", isUserLogged, userLogout);
Router.get("/profile", isUserLogged, getUserProfile);
Router.put("/editProfile",upload.single('file'), isUserLogged, editUserProfile)

export default Router;
