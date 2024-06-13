import express from "express"
import jwt from "jsonwebtoken";
import { add,get,addcourse,getcourses ,getcoursesBycategory,getallcourses} from "../contollers/course.js";
import cookieParser from "cookie-parser";
const router =express()
  const app=express()
  app.use(cookieParser())
router.post("/add", add);
router.post("/get",authenticate, get);
router.post("/addcourse", addcourse);
router.post("/getcourses", getcourses);
router.post("/getcoursesBycategory", getcoursesBycategory);
router.get("/getallcourses", getallcourses);


function authenticate(req,res,next){
  
    const token =req.cookies['access_token']
    console.log("token",token)
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
