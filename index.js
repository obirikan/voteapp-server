const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
const routes=require('./routes')

const handle=require('./handlers')
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('running')
})

const db=require('./models')
//enables you to overcome cors errors
app.use(cors())
//enables you to make post requests 
app.use(bodyParser.json())
//route handlers
app.use('/api/auth',routes.auth)
app.use('/api/poll',routes.poll)

//ERROR HANDLERS
app.use(handle.notfound)
app.use(handle.error)

//SERVER CONNECTION
const port= process.env.PORT 
app.listen(port,()=>{
    console.log(`port is running on ${port}`)
})
