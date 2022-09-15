const express = require('express')
const {getAllUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/users_controller')


const router = express.Router()

// Route /api/v1/users

router.get('/', getAllUsers)
router.get('/getme/:userId', getUser)
router.post('/register', createUser)
router.put('/updateuser/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router