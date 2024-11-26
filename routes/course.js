import express from "express"
import jwt from "jsonwebtoken";
import { add,get,addcourse,getcourses,deleteCourse,deleteCourseContent ,getcoursesBycategory,getallcourses, getcourseData} from "../contollers/course.js";
import cookieParser from "cookie-parser";
import Cookies from "cookies";
import protectRoute from "../middleware/protectRoute.js";
const router =express()
 
router.post("/add",protectRoute, add);
router.post("/get",protectRoute, get);
router.post("/addcourse",protectRoute, addcourse);
router.post("/getcourses",protectRoute, getcourses);
router.post("/getcoursesBycategory", getcoursesBycategory);
router.get("/getallcourses", getallcourses);
router.post("/delete/:id",protectRoute, deleteCourse);
router.post("/deletecoursecontent/:id",protectRoute, deleteCourseContent);
router.post("/getCourseData", getcourseData);



export default router; 
