const express = require('express')
const helmet = require('helmet')
const app = express()
const dotenv = require("dotenv");
const routes = require('./controller/api')
const bodyParser = require('body-parser')
const cors = require('cors')
const nocache = require('nocache')
dotenv.config();
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
app.use(nocache())




app.use('/api',routes);

app.use(express.static('client'))
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})