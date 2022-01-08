const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')

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
    poll:[{type:mongoose.Schema.Types.ObjectId,ref:'polls'}],

    created:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save', async function(next){
    try{
       if(!this.isModified('password')){
           return next();
       }
    const hashed=await bcrypt.hash(this.password,10);
    this.password=hashed;
    return next();
    }catch(err){
       return (err)
    }
})

userSchema.methods.comparePassword =async function(attempt,next){
    try{
      return await bcrypt.compare(attempt,this.password)
    }catch(err){
       next(err)
    }
}

module.exports=mongoose.model('user',userSchema)