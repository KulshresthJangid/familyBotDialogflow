const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
    name: {
        type: String,
        upperCase: true
    }, 
    childrens: [],
    parents: []
})

module.exports = mongoose.model('Family', familySchema)