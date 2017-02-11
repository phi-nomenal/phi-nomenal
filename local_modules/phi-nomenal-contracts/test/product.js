const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const expect = require('chai').expect
const Product = artifacts.require('Product')

contract('Product', function () {
  let name = 'Sonicare'

  let product

  beforeEach(function () {
    return Product.new(name)
      .then(function (instance) { product = instance })
  })

  it('has a name', function () {
    return product.name().then(function (retrievedName) {
      return expect(retrievedName).to.eql(name)
    })
  })
})
