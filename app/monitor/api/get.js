'use strict'

const oboe          = require('oboe')
const helper        = require('./helper')
const config        = require('../../../config')
const Monitor       = require('../model/monitor')
const Location      = require('../../location/model/location')
const Line          = require('../model/line')
const LeavingJouney = require('../model/leaving_journey')

const getMonitor = (location, callback, date = new Date()) => {
	if (!callback) {
		callback(new Error('Error fetching monitor. Did you provide a callback?'), null)
		return
	}

	const request = helper.requestForQuery(location, date)
	if (request == null) {
		callback(new Error('Error fetching monitor. Did you provide a correct location?'), null)
		return
	}

	var locations = [];
	var lines = [];
	var journeys = [];
	
	oboe(request)
		.node('locL.*', (raw) => {
			locations.push(new Location(raw))
		})
		.node('prodL.*', (raw) => {
			lines.push(new Line(raw))
		})
		.node('jnyL.*', (raw) => {
			journeys.push(new LeavingJouney(raw, lines[raw.prodX], locations[raw.stbStop.locX]))
		})
		.done(function () {
			callback(null, monitor(location, journeys))
		})
		.fail(function (err) {
			callback(new Error('Error fetching monitor. Networking error.'), null)
		})
}

// Helpers /////////////////////////////////////////////////////////////////////

const monitor = (location, journeys) => {
	const relevant = journeys.filter((journey) => {
		return (journey.location.name == location.name)
	})
	return new Monitor(location, relevant)
}

module.exports = getMonitor
