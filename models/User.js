const mongoose = require('mongoose')

const UsersSchmea = new mongoose.Schema({
    name: {
        type: String, 
        required: false
    },
    email: {
        type: String, 
        required: false
    }, 
    age: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const Users = mongoose.model('Users', UsersSchmea)

module.exports = Users