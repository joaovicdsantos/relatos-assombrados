import hapiMongo from 'hapi-mongodb';

const dbOpts = {
  url: 'mongodb://localhost:27017/relatos-assombrados',
  settings: {
    poolSize: 10,
  },
  decorate: true,
};

export default async (server) => {
  await server.register({
    plugin: hapiMongo,
    options: {
      url: 'mongodb://localhost:27017/relatos-assombrados',
      decorate: true,
    },
  });
};
