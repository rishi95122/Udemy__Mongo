import express from "express";
import authRoutes from "./routes/auth.js"
import courseRoutes from "./routes/course.js"
import chapterRoutes from "./routes/chapter.js"
import cors from "cors"




const app =express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/course",courseRoutes)
app.use("/api/chapter",chapterRoutes)

app.listen(8800,(req,res)=>{
   console.log("connected")
})