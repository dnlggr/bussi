'use strict'

function Line(raw) {
	this.name = raw.name
	this.type = undefined
	if (raw.prodCtx) {
		this.type = raw.prodCtx.catOutL
	}
	if (this.name == "") {
		this.name = undefined;
	}
}

module.exports = Line
