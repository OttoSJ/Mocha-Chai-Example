const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL, createUser } = require('./test_utils')

describe('Check If User Was Deleted', () => {
  before(async () => {
    user = await createUser()
  })

  it('Delete user', async () => {
    const response = await axios.delete(API_URL + `users/${user.data._id}`)

    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.a('string')
  })
})
