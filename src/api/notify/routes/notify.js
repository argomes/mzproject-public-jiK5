module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/notify/publickey',
      handler: 'notify.handlePublicKey',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
