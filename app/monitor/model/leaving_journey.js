'use strict'

const moment = require('moment')

function LeavingJourney(raw, line, location) {
	this.id = raw.jid
	this.line = line
	this.location = location
	this.direction = raw.dirTxt

	const rawDate = raw.date
	const rawDatePlanned =  raw.stbStop.dTimeS
	const rawDatePrognosed = raw.stbStop.dTimeR
	this.date = moment(rawDate + " " + rawDatePlanned, 'YYYYMMDD HHmmss')
	if (rawDatePrognosed) {
		this.prognosed = moment(rawDate + " " + rawDatePrognosed, 'YYYYMMDD HHmmss')
	} else {
		this.prgonosed = undefined
	}
}

module.exports = LeavingJourney
