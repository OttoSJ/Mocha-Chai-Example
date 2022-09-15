const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL } = require('./test_utils')

describe('Check If User Was Updated', () => {
  let response
  it('Updates user', async () => {
    const userId = await axios.get(API_URL + 'users')

    const userPayload = {
      name: 'Updated Test Person',
      email: 'updatetestperson@gmail.com',
      age: 200,
    }

    response = await axios.put(
      API_URL + `users/updateuser/${userId.data.data[0]._id}`,
      userPayload
    )

    expect(response.data.data.name).to.be.equal('Updated Test Person')

    console.log('Name changed to ===> ', response.data.data.name)
  })

  after((done) => {
    const userPayload = {
      name: 'Test Person',
      email: 'updatetestperson@gmail.com',
      age: 200,
    }

    axios.put(
      API_URL + `users/updateuser/${response.data.data._id}`,
      userPayload
    )
    done()
  })
})
