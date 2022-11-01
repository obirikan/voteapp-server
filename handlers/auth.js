const db=require('../models')
const jwt=require('jsonwebtoken')
///register auth
exports.register= async (req,res,next)=>{
    try{
     const user= await db.user.create(req.body);
     const {id,username}=user;

     
    const token=jwt.sign({id,username},process.env.SECRET )
    

     res.status(201).json({id,username,token})
     
    }catch(err){
        if(err.code === 11000){
           err.message='sorry username has already been taken'
        }
        next(err)
        
    }
}
//login auth
exports.login= async (req,res,next)=>{
    try{
    const user= await db.user.findOne({username:req.body.username})
    const {id,username}= user;

    const valid= await user.comparePassword(req.body.password)

        if(valid){      
    const token=jwt.sign({id,username},process.env.SECRET )
    res.json({id,username,token})
    }
    else{
            throw new Error()
        }
    }catch(err){
        err.message='invalid username/password'
        next(err)
    }
}
