'use strict'

const moment = require('moment')
const config = require('../../../../config')

const fullRequest = (location, date) => {
	if (!location.id || location.id.length === 0) {
		return null
	}
	if (!date) {
		date = new Date()
	}
	return {
		method: 'POST',
		url: config.API_URL,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': config.REQUEST_HEADER_USER_AGENT,
		},
		body: {
			'client': config.REQUEST_BODY_CLIENT,
			'lang': 'en',
			'ver': '1.11',
			"svcReqL": [
				{
					"req": {
							"stbLoc": {
								"lid": location.id
							},
							"time": moment(date).format('HHmmss'),
							"date": moment(date).format('YYYYMMDD'),
							"getPasslist": false
					},
					"meth": "StationBoard"
				}
			],
			'formatted': false,
			'auth': {'type':'USER','aid':config.REQUEST_BODY_AUTH_ID,'pw':config.REQUEST_BODY_AUTH_PW,'user':'mobile'}
		}
	}
}

module.exports = fullRequest;
