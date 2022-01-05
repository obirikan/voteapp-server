const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    polls:[{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'polls'}]
    }],
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('user',userSchema)