
import express from "express";
import { authAdmin } from "../middlewares/auth.js";
import * as userController from "../controuller/user.js"
const router = express.Router();


router.post("/", userController.addUser);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);


export default router;


