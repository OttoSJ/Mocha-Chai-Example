const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()
const { getAllUsers } = require('./test_utils')

describe('Get All Users Info', function () {
  before(async () => {
    user = await getAllUsers()
  })
  it('Check Get All Users Status Code', async () => {
    expect(user.status).to.be.equal(200)
  })

  it('Verify response being returned is an array', async () => {
    expect(user.data).to.be.an('array')
  })

  it('Verify all users are being returned by checking the length of array', async () => {
    expect(user.data).to.be.lengthOf.gte(3)
  })
})
