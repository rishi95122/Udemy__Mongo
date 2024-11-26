import { Router } from "express";
import {getMembers,deleteUserById,updateUser } from "../contollers/member.js";

const router = Router();

router.get("/", getMembers);
router.delete("/", deleteUserById);
router.put("/", updateUser);


export default router;
