const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

const port = process.env.port || 3000
app.listen(port)
