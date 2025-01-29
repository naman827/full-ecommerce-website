import express from "express";
import userCtrl from "../controller/usercontroller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.post("/refreshtoken", userCtrl.refreshtoken);
router.get("/user_info",auth,userCtrl.getuser);

export default router;
