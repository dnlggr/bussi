'use strict'

function Location(raw) {
	this.name = raw.name
	this.id = raw.lid
	this.coords = {}
	this.coords.lng = raw.crd.x / 1000000
	this.coords.lat = raw.crd.y / 1000000
}

module.exports = Location
