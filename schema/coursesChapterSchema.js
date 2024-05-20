
import mongoose from "mongoose"

const content=new mongoose.Schema({
    contentname:{
        type: String,
        required: true
    },
})

const chapter=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content:[content]
})

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    chapters: [chapter]
});



const courseChapterSchema=mongoose.model("courseChapters",courseSchema)

export default courseChapterSchema
