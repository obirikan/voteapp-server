const router=require('express').Router()

const handle=require('../handlers')

router.post('/login')
router.post('/register',handle.register)

module.exports=router