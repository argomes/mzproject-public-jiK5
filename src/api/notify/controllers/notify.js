'use strict';

const { public_key } = require("../../../../config/web-push");

/**
* A set of functions called "actions" for `notify`
*/

module.exports = {
	async handlePublicKey(ctx, next) {
		return ctx.send(public_key, 200)
	}
}
