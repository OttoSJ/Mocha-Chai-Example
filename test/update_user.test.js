const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL, createUser } = require('./test_utils')

describe('Check If User Was Updated', () => {
  before(async () => {
    user = await createUser()
  })
  it('Updates user', async () => {
    const userPayload = {
      name: 'Test Person',
      email: 'testperson@gmail.com',
      age: 20,
    }

    const response = await axios.put(
      API_URL + `users/updateuser/${user.data._id}`,
      userPayload
    )

    expect(response.data).to.be.an('object')
    expect(response.status).to.be.equal(200)
    expect(response.data.data.name).to.be.equal('Test Person')
  })

  after((done) => {
    axios.delete(API_URL + `users/${user.data._id}`)
    done()
  })
})
