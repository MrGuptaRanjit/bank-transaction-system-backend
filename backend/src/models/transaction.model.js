const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"transaction must be associated from an account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"transaction must be associated to an account"],
        index:true
    },
    status:{
        type: String,
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"status can be either PENDING,COMPLETED,FAILED, or REVERSED "
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"amount is required for creating a transaction"],
        min:[0,"Transaction amount can not be negative"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency Key is required for creating a transaction"],
        index:true,
        unique:true
    },
},
{
    timestamps:true
})

const transactionModel = mongoose.model("transaction",transactionSchema)

module.exports = transactionModel
