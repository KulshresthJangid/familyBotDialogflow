require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    console.log("DB connection esatablished")
}).catch((e) => {
    console.log("Error while connecting the db", e.message)
})