const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    taskName: {type: String, required:true},
    comment: {type: String, required:true},
    date: {type: String, required:true}
})

module.exports = mongoose.model('todoCards', todoSchema)