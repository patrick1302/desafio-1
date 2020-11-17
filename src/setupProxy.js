const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/autocomplete', {
      target: 'https://store.omelete.com.br',
      changeOrigin: true,
    })
  );
};
