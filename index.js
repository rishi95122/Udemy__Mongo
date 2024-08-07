import express from "express";
import authRoutes from "./routes/auth.js"
import courseRoutes from "./routes/course.js"
import chapterRoutes from "./routes/chapter.js"
import cors from "cors"
import cookieParser from "cookie-parser";




const app =express()
const corsOptions = {

   origin: 'https://ccourses.vercel.app', 
  
   credentials: true, 
  
   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  
  };
  app.use(cookieParser())
  app.use(cors(corsOptions));
  
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/course",courseRoutes)
app.use("/api/chapter",chapterRoutes)

app.listen(8800,(req,res)=>{
   console.log("connected")
})