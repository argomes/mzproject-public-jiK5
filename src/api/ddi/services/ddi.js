'use strict';

/**
 * ddi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ddi.ddi');
