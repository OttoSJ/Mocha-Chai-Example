const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

class MyClass {
  constructor() {
    console.log('initiate')
  }

  sayHello(str) {
    console.log(str)
  }

  add(arg1, arg2) {
    let result
    result = arg1 + arg2
    return result
  }

  callAnotherFn(arg1, arg2) {
    this.sayHello('hello world')
    const result = this.add(arg1, arg2)
    return result
  }

  callTheCallback(callback) {
    callback()
  }

  testPromise() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(3), 2000)
    }).then(function (result) {
      return result * 2
    })
  }

  xhrFn() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(
        'get',
        'https://otto-trader-api.herokuapp.com/api/inventory',
        true
      )
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve.apply(JSON.parse(xhr.responseXML))
          } else {
            reject(xhr.status)
          }
        }
      }
      xhr.send()
    })
      .then(function (result) {
        return result
      })
      .catch((error) => {
        return error
      })
  }
}

module.exports = MyClass
