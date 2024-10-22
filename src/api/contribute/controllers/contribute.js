'use strict';

/**
 * A set of functions called "actions" for `contribute`
 */

module.exports = {
   post_ko_fi: async (ctx, next) => {
     try {
      const data = await strapi
        .service('api::contribute.contribute').save_ko_fi(ctx.request.body) 
      ctx.body = "ok"
     } catch (err) {
       ctx.body = err;
     }
   },
   post_livepix: async (ctx, next) => {
    try {
      console.log(ctx.request)
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }

};
