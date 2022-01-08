const db=require('../models')

exports.register=async (req,res,next)=>{
    try{
     const user=await db.user.create(req.body);

     res.json(user)

    }catch(err){
        next(err)
    }
}

exports.login= async (req,res,next)=>{
    try{
         
    }catch(err){}
}