require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectToDatabase = require('./config/database')
const routes = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: process.env.URL,
    credentials: true
}));
app.use(cookieParser())
app.use('/',routes)

connectToDatabase()

module.exports = app