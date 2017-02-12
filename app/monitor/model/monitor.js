'use strict'

function Monitor(location, journeys) {
	this.location = location
	this.departures = journeys.map((journey) => {
		var departure = {};
		departure.line = journey.line
		departure.line.direction = journey.direction
		departure.date = journey.date
		return departure
	})
}

module.exports = Monitor
