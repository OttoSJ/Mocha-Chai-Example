const MyClass = require('../src/myclass')
const myObject = new MyClass()
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

describe.skip('Test suit', function () {
  it('Test the add method', function () {
    expect(myObject.add(1, 2)).to.be.equal(3)
  })

  it('spy the add method', function () {
    const spy = sinon.spy(myObject, 'add') // Spy is wrapper around the method you pass it.
    const arg1 = 10,
      arg2 = 20
    myObject.callAnotherFn(arg1, arg2)
    // sinon.assert.calledOnce(spy) // <=== One way to do this. See below for another way.
    expect(spy.calledOnce).to.be.true // <=== Another way to do this
    expect(spy.calledWith(arg1, arg2)).to.be.true
  })

  it('Spy the callback method', function () {
    const callback = sinon.spy() // <== Creating a spy for callTheCallbace method.

    myObject.callTheCallback(callback) // <== Creates a wrapper for the callback inside callTheCallback method

    expect(callback.calledOnce).to.be.true
  })

  it('Mock the sayHello method', function () {
    const mock = sinon.mock(myObject)
    const expectation = mock.expects('sayHello')
    expectation.exactly(1) // <== Check to verify that callback is called only once
    expectation.withArgs('hello world') // <=== Check to see if the args passed match the string passed here.
    myObject.callAnotherFn(10, 20)
    mock.verify() // <=== Verifies all mock expectations.
  })
})

describe('Test suit for stub', function () {
  it('Stub the add method', function () {
    const stub = sinon.stub(myObject, 'add')
    stub.withArgs(10, 20).returns(100)
    expect(myObject.callAnotherFn(10, 20)).to.be.equal(100)
  })
})
