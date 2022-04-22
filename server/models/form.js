import mongoose from "mongoose";

const workSchema = mongoose.Schema({
    fullname : String,
    phonenum : String,
    email : String,
    university : String,
    aboutyou : String,
    skills : String,
    intersted :Array,
    others:String,
    resumeName:String,
})

const formDetails = mongoose.model("formDetails",workSchema)
export default formDetails