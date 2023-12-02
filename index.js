require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const routing = require('./NSR Cal Routes/routes')

const app = express()

PORT = process.env.PORT||8081

function startApp(){

    app.use(bodyparser.json())

    app.use(cors({
        origin:'http://127.0.0.1:5173',
        credentials : true
    }))

    bodyparser.urlencoded({extended: true})

    app.use('/NSRCal/api/v1' , routing)

    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)

    })
}

startApp()