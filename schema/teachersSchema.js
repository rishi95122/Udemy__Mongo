
import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
        required: true
    },
    courses: [courseSchema]
});

const teacherSchema=mongoose.model("teacher",teachers)

export default teacherSchema
