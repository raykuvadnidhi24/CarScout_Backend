const mongoose = require("mongoose")
const Schema = mongoose.Schema

const offertableSchema = new Schema({
    CarId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"cartable"
        },
    BuyerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
    Offeredprice:{
         type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Rejected"
    },
    OfferDate:{
         type:String,
        default:Data.now,
        required:true
    },       
})

module.exports = mongoose.model("offertable",offertableSchema) 
