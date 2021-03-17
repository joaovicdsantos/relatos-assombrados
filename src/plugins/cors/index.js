import cors from 'hapi-cors';

export default async (server) => {
  await server.register({
    plugin: cors,
    options: {
      origins: ['*'],
    },
  });
};
