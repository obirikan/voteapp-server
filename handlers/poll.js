const db=require('../models')

exports.showpoll=async (req,res,next)=>{
  try{
   const polls=await db.polls.find()

   res.status(200).json(polls)
  }catch(err){
   err.status=400
   next(err)
  }
}

exports.createPoll=async (req,res,next)=>{
    try{
    const {question,options}=req.body
    const poll=await db.polls.create({
        question,
        options:options.map(option=>({
            option,
            votes:0
        }))
    })

      res.status(201).json(poll)
    }catch(err){
     err.status=400
     next(err)
    }
}