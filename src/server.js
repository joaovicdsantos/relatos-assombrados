import hapi from '@hapi/hapi';
import routes from './routes/index.js';
import dotenv from 'dotenv';

// Plugins
import mongodb from './plugins/mongodb/index.js';
import autenticacao from './plugins/autenticacao/index.js';
import vision from './plugins/vision/index.js';
import inert from './plugins/inert/index.js';
import cors from './plugins/cors/index.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

(async () => {
  const server = hapi.Server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: true,
      files: {
        relativeTo: join(
          dirname(fileURLToPath(import.meta.url)),
          'templates/static'
        ),
      },
    },
  });

  dotenv.config();

  await mongodb(server);
  //await autenticacao(server);
  await vision(server);
  await inert(server);
  await cors(server);

  routes.map((route) => server.route(route));

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
      },
    },
  });

  await server.start();
  console.log('[Servidor] - Servidor iniciado com sucesso');
})();
