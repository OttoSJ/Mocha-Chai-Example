const Users = require('../models/User')

exports.getAllUsers = async(req, res) => {
    try {
        const users = await Users.find({}).sort({date: 'DESC'})
    res.status(200).json({success: true, data: users})
        
    } catch (error) {
        res.status(400).json({success: false, error: error})
    }
}

exports.getUser = async(req, res) => {
    try {
        const users = await Users.findOne({_id: req.params.userId})
    res.status(200).json({success: true, data: users})
        
    } catch (error) {
        res.status(400).json({success: false, error: error})
    }
}

exports.createUser = async (req, res, ) => {
    const {name, email, age} = req.body
    try {
        const user = await Users.create(req.body)

        if (!name || !email, !age) {
            return res.status(422).json({
                success: false, error: 'Please all fields'
            })
        }
        
        res.status(201).json({success: true, data: user})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, error: error})
        
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true})    
        res.status(200).json({
            success: true, data: user
        })    
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, error})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await Users.findById({_id: req.params.userId})
        
        if (!user) {
            return res.status(404).json({success: false, msg: 'User not found'})
        }

        await user.remove()

        res.status(200).json({success: true, data: `User with the id of ${user._id} was deleted`})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, error})
        
    }
}