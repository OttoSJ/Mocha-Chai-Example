const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL, createUser } = require('./test_utils')

describe('Check If User Was Created', () => {
  before(async () => {
    user = await createUser()
  })

  it('Create user', async () => {
    expect(user.data.name).to.be.equal('Somebody Else')
    expect(user.data.email).to.be.equal('somebodyelse@gmail.com')
    expect(user.data.age).to.be.equal(25)
    user.data.should.have.property('name')
    user.data.should.have.property('email')
    user.data.should.have.property('age')
  })

  after((done) => {
    axios.delete(API_URL + `users/${user.data._id}`)
    done()
  })
})
