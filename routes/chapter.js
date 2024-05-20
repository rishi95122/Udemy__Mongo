import { addContent,getContent} from "../contollers/chapter.js"
import express from "express"

const router =express()
  
router.post("/content", addContent);
router.post("/getContent", getContent);


export default router;