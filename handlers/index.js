module.exports={
  ...require('./auth')
}

module.exports.error=(err,req,res,next)=>{
    res.status(err.status || 400).json({
        error:err.message || "something went wrong"
    })
  }
module.exports.notfound=(req,res,next)=>{
    const err=new Error('not found')
    err.status=404
    next(err)
 }