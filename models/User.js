const mongoose = require('mongoose')

const UsersSchmea = new mongoose.Schema({
    firstName: {
        type: String, 
        required: false
    },
    lastName: {
        type: String, 
        required: false
    }
})

const Users = mongoose.model('Users', UsersSchmea)

module.exports = Users