const mongoose=require('mongoose');
//at first it was "option:String"

const optionSchema=new mongoose.Schema({
    option:{
      type:String
    },
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
    voted:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    created:{
    type:Date,
    default:Date.now
    }
})

module.exports =mongoose.model('polls',pollSchema)
