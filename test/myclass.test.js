const MyClass = require('../src/myclass')
const myObject = new MyClass()
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const chaiaspromise = require('chai-as-promised')
chai.use(chaiaspromise)
const nock = require('nock')

describe('Test suit', function () {
  beforeEach(function () {
    sinon.restore() // <=== This restores all sinon spy's before each test case instead of call this in each test case like below around line 28
  })
  // TESTING A METHOD
  it('Test the add method', function () {
    expect(myObject.add(1, 2)).to.be.equal(3)
  })

  // CREATING AND TEST SPYING A METHOD
  it('spy the add method', function () {
    const spy = sinon.spy(myObject, 'add') // Spy is wrapper around the method you pass it.
    const arg1 = 10,
      arg2 = 20
    myObject.callAnotherFn(arg1, arg2)
    // sinon.assert.calledOnce(spy) // <=== One way to do this. See below for another way.
    expect(spy.calledOnce).to.be.true // <=== Another way to do this
    expect(spy.calledWith(arg1, arg2)).to.be.true
    spy.restore() // <=== This restores the spy method which allows it to be called again below without an error.
  })

  it('Copy of spy the add method', function () {
    const spy = sinon.spy(myObject, 'add') // Spy is wrapper around the method you pass it.
    const arg1 = 10,
      arg2 = 20
    myObject.callAnotherFn(arg1, arg2)
    // sinon.assert.calledOnce(spy) // <=== One way to do this. See below for another way.
    expect(spy.calledOnce).to.be.true // <=== Another way to do this
    expect(spy.calledWith(arg1, arg2)).to.be.true
  })

  // CREATING AND TEST SPYING A CALLBACK METHOD
  it('Spy the callback method', function () {
    const callback = sinon.spy() // <== Creating a spy for callTheCallbace method.

    myObject.callTheCallback(callback) // <== Creates a wrapper for the callback inside callTheCallback method

    expect(callback.calledOnce).to.be.true
  })

  // CREATING AND TESTING MOCKING
  it('Mock the sayHello method', function () {
    const mock = sinon.mock(myObject)
    const expectation = mock.expects('sayHello')
    expectation.exactly(1) // <== Check to verify that callback is called only once
    expectation.withArgs('hello world') // <=== Check to see if the args passed match the string passed here.
    myObject.callAnotherFn(10, 20)
    mock.verify() // <=== Verifies all mock expectations.
  })
})

// CREATING AND TESTING STUBS
describe('Test suit for stub', function () {
  it('Stub the add method', function () {
    const stub = sinon.stub(myObject, 'add')

    stub.withArgs(10, 20).returns(100) // <=== This asserts that whatever the value of add function is we are instead checking the value of what is set in the returns()

    stub
      .withArgs(10, 20)
      .returns(1000)
      .onFirstCall()
      .returns(100) // On the first call below we expect 100
      .onSecondCall()
      .returns(200) // On the second call below we expect 200
    expect(myObject.callAnotherFn(10, 20)).to.be.equal(100)
    expect(myObject.callAnotherFn(10, 20)).to.be.equal(200)
  })
})

// TESTING PROMISES
describe.skip('Test the promise', function () {
  it('Promise test case', function (done) {
    // <=== done must be passed into this function
    this.timeout(0) // <== This timeout(0) forces done() to wait until either the promise resolved or rejected if 0 is passed. If 1000 is passed then done() waits for one second
    myObject.testPromise().then(function (result) {
      expect(result).to.be.equal(61)
      done() // <=== done must be called inside the the testPromise block.
    })
  })
})

// TESTING PROMISES WITH CHAIASPROMISE ** THIS IS A BETTER WAY TO TEST PROMISES **
describe('Test the promise with chai', function () {
  it('Promise test case chai', function () {
    this.timeout(0)
    return expect(myObject.testPromise()).to.eventually.equal(6)
  })
})

describe('XHR test suit', function () {
  after(function () {
    console.log('---------> After test suit')
  })
  before(function () {
    console.log('---------> Before test suit')
  })

  afterEach(function () {
    console.log('--------> After each test case')
  })
  this.beforeEach(function () {
    console.log('-------->Before each test case')
  })
  it('Mock and stub xhr call', function (done) {
    const scope = nock('https://otto-trader-api.herokuapp.com/api/inventory')
      .get()
      .reply(200, { id: 123 })
    myObject
      .xhrFn()
      .then(function (result) {
        // expect(result).to.be.equal({ id: 123 })
        console.log(result)
        done()
      })
      .catch((error) => {
        done(new Error('test case failed'))
      })
  })
})
