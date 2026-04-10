const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carimgSchema = new Schema({
    CarId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cartable"
    },
    Imageurl:{
         type:String,
        required:true
    },

})

module.exports = mongoose.model("carimg",carimgSchema) 