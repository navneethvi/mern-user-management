import express from "express";

const Router = express.Router();

import {
  adminLogin,
  adminLogout,
  getAllUsers,
  editUser,
  deletUser,
} from "../controller/adminController.js";

Router.post("/login", adminLogin);
Router.post("/logout", adminLogout);
Router.get("/listUser", getAllUsers);
Router.post("/editUser", editUser);
Router.post("/deleteUser", deletUser);

export default Router;
