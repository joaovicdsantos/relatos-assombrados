import hapiJwt from '@hapi/jwt';

export default async (server) => {
  await server.register(hapiJwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.API_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: false,
      exp: false,
      maxAgeSec: 86400, // 1 dia
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
      };
    },
  });

  server.auth.default('jwt');
};
