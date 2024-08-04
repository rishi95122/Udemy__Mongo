
import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const teachers = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true
    },
    courses: [courseSchema]
});

const teacherSchema=mongoose.model("teacher",teachers)

export default teacherSchema
