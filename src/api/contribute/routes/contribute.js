module.exports = {
  routes: [
     {
      method: 'POST',
      path: '/contribute/ko-fi',
      handler: 'contribute.post_ko_fi',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'POST',
      path: '/contribute/post_livepix',
      handler: 'contribute.post_livepix',
      config: {
        policies: [],
        middlewares: [],
      },
     }
  ]
};

