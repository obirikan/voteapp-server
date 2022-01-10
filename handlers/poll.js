const db=require('../models')
//show all polls in database and users
exports.showpoll=async (req,res,next)=>{
  try{
   const polls=await db.polls.find().populate('user',['username','id'])
     
   res.status(200).json(polls)
  }catch(err){
   err.status=400
   next(err)
  }
}

exports.userpolls=async (req,res,next)=>{
 try{
     const {id}=req.decoded

     const user=await db.user.findById(id).populate('poll')

     res.status(200).json(user.poll)
 }catch(err){
     err.status=400

     next(err)
 }

}

//creating a poll and saving the user who saved the poll
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

      res.status(201).json({...poll._doc,user:user._id})
    }catch(err){
     err.status=400
     next(err)
    }
}


//getting specific poll
exports.getpoll=async (req,res,next)=>{
try{
    const {id}=req.params
    const poll=await db.polls.findById(id).populate('user',['username','id'])

   if(!poll) throw new Error("no poll found")

   res.status(200).json(poll)
}
catch(err){
     err.status=400
     next (err)
}
}
//deleting a poll
exports.deletepoll=async (req,res,next)=>{
    try{
         const {id: pollId} =req.params
         const {id: userId} =req.decoded
         

         const poll= await db.polls.findById(pollId)

         if(!poll) throw new Error('no poll found')
         
         if(poll.user.toString() ==! userId){
           throw new Error('unaurthorized access')
         }

         await poll.remove()

         res.status(202).json(poll)
    }catch(err){
       err.status=400
       next(err)
    }
}