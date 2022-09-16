const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL, createUser } = require('./test_utils')

describe('Check User Info', () => {
  before(async () => {
    user = await createUser()
  })

  it('Check status code, properties and user id', async () => {
    const response = await axios.get(API_URL + `users/getme/${user.data._id}`)

    expect(response.status).to.be.equal(200)
    expect(response.data.data._id).to.be.equal(user.data._id)
    response.data.data.should.have.property('name')
    response.data.data.should.have.property('email')
    response.data.data.should.have.property('age')
  })

  after((done) => {
    axios.delete(API_URL + `users/${user.data._id}`)
    done()
  })
})
