const router=require('express').Router()

const handle=require('../handlers')

router.post('/register',handle.register)
router.post('/login')

module.exports=router