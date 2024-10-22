'use strict';

/**
 * live-stream router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::live-stream.live-stream');
