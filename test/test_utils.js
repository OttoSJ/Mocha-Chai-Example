const axios = require('axios')

const API_URL = 'http://localhost:5000/api/v1/'

const createUser = async () => {
  const userPayload = {
    name: 'Somebody Else',
    email: 'somebodyelse@gmail.com',
    age: 25,
  }
  const response = await axios.post(API_URL + 'users/register', userPayload)

  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get(API_URL + 'users')

  response.data['status'] = response.status
  return response.data
}

module.exports = {
  API_URL,
  createUser,
  getAllUsers,
}
