import express from "express"
import jwt from "jsonwebtoken";
import { add,get,addcourse,getcourses,deleteCourse,deleteCourseContent ,getcoursesBycategory,getallcourses} from "../contollers/course.js";
import cookieParser from "cookie-parser";
import Cookies from "cookies";
const router =express()
 
router.post("/add", add);
router.post("/get", get);
router.post("/addcourse", addcourse);
router.post("/getcourses", getcourses);
router.post("/getcoursesBycategory", getcoursesBycategory);
router.get("/getallcourses", getallcourses);
router.post("/delete/:id", deleteCourse);
router.post("/deletecoursecontent/:id", deleteCourseContent);


function authenticsate(req,res,next){
    const cookies = new Cookies(req, res);

    const token =req.cookies['access_token']
    console.log("token",cookies.get("access_token'"))
    if(token==null) return res.sendStatus(401)
       
    jwt.verify(token,"jwtkey",(err,user)=>{
      console.log(err,
        "fds",user)
        if(err) return res.sendStatus(403)
       
     req.user=user
    next()
    })
    }

export default router; 
