const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL } = require('./test_utils')

describe('Check If User Was Created', () => {
  let response

  it('Create user', async () => {
    const user = {
      name: 'Test Person',
      email: 'testperson@gmail.com',
      age: 33,
    }
    response = await axios.post(API_URL + 'users/register', user)

    expect(response.data.data.name).to.be.equal('Test Person')
  })

  after((done) => {
    axios.delete(API_URL + `users/${response.data.data._id}`)
    done()
  })
})
