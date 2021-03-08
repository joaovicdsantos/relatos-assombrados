import hapi from '@hapi/hapi';
import routes from './routes/index.js';
import dotenv from 'dotenv';

// Plugins
import mongodb from './plugins/mongodb/index.js';
import autenticacao from './plugins/autenticacao/index.js';

(async () => {
  const server = hapi.Server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  dotenv.config();

  await mongodb(server);
  await autenticacao(server);

  routes.map((route) => server.route(route));

  await server.start();
  console.log('[Servidor] - Servidor iniciado com sucesso');
})();
