const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL } = require('./test_utils')

const createUser = async () => {
  const userPayload = {
    name: 'Delete Test Person',
    email: 'deletetestperson@gmail.com',
    age: 666,
  }
  const response = await axios.post(API_URL + 'users/register', userPayload)

  return response.data.data._id
}

describe('Check If User Was Deleted', () => {
  it('Delete user', async () => {
    const userId = await createUser()

    const response = await axios.delete(API_URL + `users/${userId}`)

    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.a('string')
  })
})
