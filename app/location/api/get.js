'use strict'

const oboe     = require('oboe')
const helper   = require('./helper')
const config   = require('../../../config')
const Location = require('../model/location')

const getLocation = (query, callback) => {
	if (!callback) {
		callback(new Error('Error fetching locations. Did you provide a callback?'), null)
		return
	}

	const request = helper.requestForQuery(query)
	if (!request) {
		callback(new Error('Error fetching locations. Did you provide query?'), null)
		return
	}

	var locations = [];
	
	oboe(request)
		.node('locL.*', (raw) => {
			locations.push(new Location(raw))
		})
		.done(function () {
			callback(null, locations)
		})
		.fail(function (err) {
			callback(new Error('Error fetching locations.'), null)
		})
}

module.exports = getLocation
