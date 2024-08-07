import { register,login,logout,mail,forgot, getme } from "../contollers/auth.js"
import express from "express"
import protectRoute from "../middleware/protectRoute.js";

const router =express()
  
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/mail", mail);
router.post("/forgot", forgot);
router.get("/me",protectRoute, getme);
export default router;