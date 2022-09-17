const MyClass = require('../src/myclass')
const myObject = new MyClass()
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

describe('Test suit', function () {
  it('Test the add method', function () {
    expect(myObject.add(1, 2)).to.be.equal(3)
  })

  it('Spy the add method', function () {
    const spy = sinon.spy(myObject, 'add') // Spy is wrapper around the method you pass it.
    const callback = sinon.spy()

    const arg1 = 10,
      arg2 = 10

    myObject.callAnotherFn(arg1, arg2)

    myObject.callTheCallback(callback)

    // sinon.assert.calledOnce(spy) // <=== One way to do this. See below for another way.
    expect(spy.calledOnce).to.be.true // <=== Another way to do this
    expect(spy.calledWith(arg1, arg2)).to.be.true
    expect(callback.calledOnce).to.be.true
  })
})
