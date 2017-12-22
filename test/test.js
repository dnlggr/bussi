'use strict'

const should      = require('chai').should()
const expect      = require('chai').expect
const credentials = require('./credentials')
const config      = require('../config')
const app         = require('../app')

describe('Location', function() {
	before(function() {
		app.use(credentials)
	})
	describe('#get()', function() {
		this.slow(500)
		this.timeout(3000)
		it('should return ' + config.LOCATION_MAX_RESULTS + ' locations per default.', function(done) {
			app.location.get('Bahnhof', (error, locations) => {
				locations.should.have.lengthOf(config.LOCATION_MAX_RESULTS)
				locations[0].should.have.property('name')
				locations[0].should.have.property('id')
				locations[0].should.have.property('coords')
				locations[0].coords.should.have.property('lat')
				locations[0].coords.should.have.property('lng')
				done()
			})
		})
		it('should return 1 location if `LOCATION_MAX_RESULTS` is set to 1.', function(done) {
			const oldMax = config.LOCATION_MAX_RESULTS
			config.LOCATION_MAX_RESULTS = 1
			app.location.get('Westbahnhof, Innsbruck', function(error, locations) {
				config.LOCATION_MAX_RESULTS = oldMax
				locations.should.have.lengthOf(1)
				locations[0].should.have.property('name')
				locations[0].should.have.property('id')
				locations[0].should.have.property('coords')
				locations[0].coords.should.have.property('lat')
				locations[0].coords.should.have.property('lng')
				done()
			})
		})
	})
})

describe('Monitor', function() {
	describe('#get()', function() {
		this.slow(800)
		this.timeout(4000)
		it('should return a monitor for a valid location.', function(done) {
			app.location.get('Westbahnhof, Innsbruck', (error, locations) => {
				expect(locations).to.have.length.above(0)
				app.monitor.get(locations[0], (error, monitor) => {
					monitor.should.exist
					monitor.location.name.should.equal('Innsbruck Westbahnhof')
					monitor.departures.should.be.an('array')
					monitor.departures.should.have.length.above(0)
					monitor.departures[0].should.have.property('date')
					monitor.departures[0].should.have.property('line')
					monitor.departures[0].line.should.have.property('name')
					monitor.departures[0].line.should.have.property('direction')
					done()
				})
			})
		})
		it('should include a line \'T\' for a location \'Westbahnhof, Innsbruck\' at noon.', function(done) {
			app.location.get('Westbahnhof, Innsbruck', (error, locations) => {
				expect(locations).to.have.length.above(0)
				app.monitor.get(locations[0], (error, monitor) => {
					const linesT = monitor.departures.filter((departure) => {
						return (departure.line.name == 'T')
					})
					linesT.should.not.be.empty
					done()
				}, new Date('2017-01-21T11:00:00.000Z'))
			})
		})
		it('should include a line \'N3\' for a location \'Westbahnhof, Innsbruck\' at midnight.', function(done) {
			app.location.get('Westbahnhof, Innsbruck', (error, locations) => {
				expect(locations).to.have.length.above(0)
				app.monitor.get(locations[0], (error, monitor) => {
					const linesN3 = monitor.departures.filter((departure) => {
						return (departure.line.name == 'N3')
					})
					linesN3.should.not.be.empty
					done()
				}, new Date('2017-01-21T23:00:00.000Z'))
			})
		})
		it('should error for an invalid location', function(done) {
			app.monitor.get('Quetzaltenango', (error, monitor) => {
				expect(error).to.exist
				expect(monitor).to.equal(null)
				done()
			})
		})
		it('should return date and date_prognosed for a line', function(done) {
			app.location.get('Westbahnhof, Innsbruck', (error, locations) => {
				expect(locations).to.have.length.above(0)
				app.monitor.get(locations[0], (error, monitor) => {
					expect(monitor.departures[0].date).to.exist
					expect(monitor.departures[0].date_planned).to.exist
					done()
				})
			})
		})
	})
})
