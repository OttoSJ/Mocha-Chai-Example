const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const axios = require('axios')
const { API_URL } = require('./test_utils')

describe('Get All Users Info', function () {
  it('Check Get All Users Status Code', async () => {
    const response = await axios.get(API_URL + 'users')

    expect(response.status).to.be.equal(200)
  })

  it('Verify response being returned is an array', async () => {
    const response = await axios.get(API_URL + 'users')

    expect(response.data.data).to.be.an('array')
  })

  it('Verify all users are being returned by checking the length of array', async () => {
    const response = await axios.get(API_URL + 'users')

    expect(response.data.data).to.be.lengthOf.gte(3)
  })
})
