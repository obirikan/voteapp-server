const router=require('express').Router()
//middle ware import
const auth=require('../middlewares/auth.js')

const handle=require('../handlers')
router.route('/').get(handle.showpoll)
.post(auth,handle.createPoll)

router.get('/user',auth,handle.userpolls)

router.route('/:id')
.get(handle.getpoll)
.delete(auth,handle.deletepoll)
module.exports=router
