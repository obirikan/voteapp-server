const db=require('../models')

exports.register= async (req,res,next)=>{
    try{
     const user= await db.user.create(req.body);
     const {id,username}=user;

     res.status(201).json({id,username})
     
    }catch(err){
        if(err.code === 11000){
           err.message='sorry username has already been taken'
        }
        next(err)
        
    }
}

exports.login= async (req,res,next)=>{
    try{
    const user= await db.user.findOne({username:req.body.username})
    const {id,username}= user;

    const valid= await user.comparePassword(req.body.password)
        if(valid){
            res.json({id,username})
        }else{
            throw new Error()
        }
    }catch(err){
        err.message='invalid username/password'
        next(err)
    }
}