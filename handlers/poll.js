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
    const {id}=req.decoded

    const user= await db.user.findById(id)

    const {question,options}=req.body

    const poll=await db.polls.create({
        user,
        question,
        options:options.map(option=>({
            option,
            votes:0
        }))
    })
    user.poll.push(poll._id);
    await user.save()

      res.status(201).json(poll)
    }catch(err){
     err.status=400
     next(err)
    }
}