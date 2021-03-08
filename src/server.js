import hapi from '@hapi/hapi';
import routes from './routes/index.js';

// Plugins
import mongodb from './plugins/mongodb/index.js';

(async () => {
  const server = hapi.Server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  await mongodb(server);

  routes.map((route) => server.route(route));

  await server.start();
  console.log('[Servidor] - Servidor iniciado com sucesso');
})();
