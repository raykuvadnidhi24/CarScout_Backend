const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartableSchema = new Schema({
    SellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    Make:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    Year:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Mileage:{
        type:String,
        required:true
    },
    Fueltype:{
        type:String,
        enum:["Petrol","Diesel","Electric"],
        default:"petrol"
    },
    Transmission:{
        type:String,
        enum:["Manual","Automatic"],
        default:"Manual"
    },
    description:{
        type:String,
         required:true
    },
    status:{
        type:String,
        enum:["Available","Sold"],
        default:"Sold"
    },
})

module.exports = mongoose.model("cartable",cartableSchema) 