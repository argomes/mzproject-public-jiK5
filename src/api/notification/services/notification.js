'use strict';

const webPush = require('../../../../config/web-push');


/**
 * notification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notification.notification');
