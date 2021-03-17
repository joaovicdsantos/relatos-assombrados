import vision from 'vision';
import handlebars from 'handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default async (server) => {
  await server.register(vision);

  server.views({
    engines: {
      html: handlebars,
    },
    relativeTo: dirname(fileURLToPath(import.meta.url + '/../../')),
    path: 'templates',
  });
};
