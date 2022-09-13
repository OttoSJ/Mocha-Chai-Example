const Users = require('../models/User')

exports.getAllUsers = async(req, res) => {
res.status(201).json({success: true, data: 'You got all the users'})
}