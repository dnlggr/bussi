'use strict'

const config = require('../../../../config')

const fullRequest = (query) => {
	if (!query || query.length === 0) {
		return null
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
			'svcReqL': [
				{
					'cfg': {'polyEnc':'GPA'},
					'meth': 'LocMatch',
					'req': {
						'input': {
							'field': 'S',
							'loc': {'type':'ALL','name':query+'?'},
							'maxLoc': config.LOCATION_MAX_RESULTS,
						}
					}
				}
			],
			'formatted': false,
			'auth': {'type':'USER','aid':config.REQUEST_BODY_AUTH_ID,'pw':config.REQUEST_BODY_AUTH_PW,'user':'mobile'}
		}
	}
}

module.exports = fullRequest;
