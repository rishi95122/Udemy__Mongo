import { register,login,logout,mail,forgot } from "../contollers/auth.js"
import express from "express"

const router =express()
  
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/mail", mail);
router.post("/forgot", forgot);
export default router;