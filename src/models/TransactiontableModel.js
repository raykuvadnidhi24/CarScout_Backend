const mongoose = require("mongoose")
const Schema = mongoose.Schema

const transactiontableSchema = new Schema({
     CarId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"cartable"
            },
    BuyerId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
    SellerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }, 
    FinalPrice:{
         type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["Pending","Failed","Completed"],
        default:"Pending"
    },  
    Transactiondate:{
        type:String,
        default:Data.now,
        required:true
    },      
})

module.exports = mongoose.model("transactiontable",transactiontableSchema) 

