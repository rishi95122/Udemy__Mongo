
import mongoose from "mongoose"

const content=new mongoose.Schema({
    contentname:{
        type: String,
        required: true,
        trim:true
    },
})

const chapter=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    content:[content]
})

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        trim:true
    },
    username: {
        type: String,
        required: true,
        trim:true
    },
    chapters: [chapter]
});



const courseChapterSchema=mongoose.model("courseChapters",courseSchema)

export default courseChapterSchema
