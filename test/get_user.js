const expect = require('chai').expect
let chai = require('chai')
const should = chai.should()

describe('Check two numbers', function() {

    it('Match two numbers', () => {
        let first = 10
        let second = 10

        expect(first).to.be.equal(second)
    })

    it('Should not match two numbers', () => {
        let first = 10
        let second = 1

        expect(first).not.to.be.equal(second)
    })

    it('Should have matching name', () => {
       let name = 'Otto'

        expect(name).to.be.equal('Otto')
    })
})