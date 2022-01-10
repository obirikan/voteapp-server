const router=require('express').Router()

const auth=require('../middlewares/auth.js')

const handle=require('../handlers')
router.route('/').get(handle.showpoll)
.post(auth,handle.createPoll)

module.exports=router