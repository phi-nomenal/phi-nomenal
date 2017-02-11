const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const expect = require('chai').expect
const Location = artifacts.require('Location')

contract('Location', function () {
  const locationType = 1
  const geolocation = 'The Big Building'

  let location

  beforeEach(function () {
    return Location.new(locationType, geolocation)
      .then(function (instance) { location = instance })
  })

  it('contains the type', function () {
    return location.locationType()
      .then(function (retrievedType) {
        expect(retrievedType.toNumber()).to.eql(locationType)
      })
  })

  it('contains the geolocation', function () {
    return location.geolocation()
      .then(function (retrievedLocation) {
        expect(retrievedLocation).to.eql(geolocation)
      })
  })
})
