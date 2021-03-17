import inert from '@hapi/inert';

export default async (server) => {
  await server.register(inert);
};
