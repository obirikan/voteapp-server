const mongoose=require('mongoose');


const optionSchema=new mongoose.Schema({
    option:String,
    votes:{
        type:Number,
        default:0
    }
})

const pollSchema=new mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
    },
    question:String,
    options:[optionSchema],
    voted:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'}],
    created:{
    type:Date,
    default:Date.now
    }
})