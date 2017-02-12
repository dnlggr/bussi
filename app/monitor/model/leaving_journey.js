'use strict'

const moment = require('moment')

function LeavingJourney(raw, line, location) {
	this.id = raw.jid
	this.line = line
	this.location = location
	this.direction = raw.dirTxt

	const rawDate = raw.date
	const rawTime = raw.stbStop.dTimeR ? raw.stbStop.dTimeR : raw.stbStop.dTimeS
	this.date = moment(rawDate + " " + rawTime, 'YYYYMMDD HHmmss')
}

module.exports = LeavingJourney
