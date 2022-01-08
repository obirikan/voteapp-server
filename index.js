require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
const route=require('./routes')

const handle=require('./handlers')


app.get('/',(req,res)=>{
    res.send('running')
})

const db=require('./models')

app.use(cors())
app.use(bodyParser.json)
app.use('/api/auth',route.auth)
//ERROR HANDLERS
app.use(handle.notfound)
app.use(handle.error)

//SERVER CONNECTION
const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`port is running on ${port}`)
})