const { application } = require('express')
const express = require('express')
const mongoose = require('mongoose')
// DB connection
const db = require('./db/db')
const addFamily = require('./routes/addFamilly')
const botRoutes = require('./routes/botRoutes')



const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(addFamily)
app.use(botRoutes)


app.get('/', (req, res) => {
    res.render('index')
})

const port = process.env.PORT || 3000

app.listen(port, (req, res) => {
    console.log(`Server is up and runnin on port ${port}`)
})