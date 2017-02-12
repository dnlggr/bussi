const config = require('./config')

const set = (key, value, optional = false) => {
	if (value) {
		config[key] = value
	} else if (!optional) {
		throw new Error('API Credentials must include property ' + key)
	}
}

module.exports = (credentials) => {
	set('API_URL', credentials['API_URL'])
	set('REQUEST_HEADER_USER_AGENT', credentials['USER_AGENT'], true)
	set('REQUEST_BODY_CLIENT', credentials['CLIENT'])
	set('REQUEST_BODY_AUTH_ID', credentials['USER'])
	set('REQUEST_BODY_AUTH_PW', credentials['PASSWORD'])
}
