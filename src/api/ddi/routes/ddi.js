'use strict';

/**
 * ddi router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::ddi.ddi');
