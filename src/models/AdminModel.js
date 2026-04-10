const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    created:{
        type:String,
        default:Data.now,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },
})

module.exports = mongoose.model("admin",adminSchema)
