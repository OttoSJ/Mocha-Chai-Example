const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL } = require('./test_utils')

describe('Check User Info', () => {
  it('Check get single user status code', async () => {
    const userId = await axios.get(API_URL + 'users')

    const response = await axios.get(
      API_URL + `users/getme/${userId.data.data[0]._id}`
    )

    expect(response.status).to.be.equal(200)
    expect(response.data.data._id).to.be.equal(userId.data.data[0]._id)
  })
})
