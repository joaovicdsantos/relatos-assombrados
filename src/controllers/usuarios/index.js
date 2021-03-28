import Response from '../../models/Response.js';
import { login } from '../../helpers/login.js';
import { Boom } from '@hapi/boom';
import {
  atualizarUmUsuario,
  deletarUmUsuario,
  obterTodosUsuarios,
  obterUmUsuario,
  salvarUmUsuario,
} from '../../services/UsuariosServices.js';

export default {
  login: async (req, h) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return new Boom('Você precisa mandar dados para login', {
        statusCode: 401,
      });
    }
    try {
      const token = await login(authorization, req.server.mongo.db);
      return h.response({ token });
    } catch (error) {
      return new Boom(error, { statusCode: 401 });
    }
  },
  obterUsuarios: async (req, h) => {
    const response = await obterTodosUsuarios(req.server.mongo.db);
    return h.response(response);
  },
  obterUmUsuario: async (req, h) => {
    const response = await obterUmUsuario(req.server.mongo.db, req.params.id);
    return h.response(response).code(response.statusCode);
  },
  salvarUmUsuario: async (req, h) => {
    const response = await salvarUmUsuario(req.server.mongo.db, req.payload);
    return h.response(response).code(response.statusCode);
  },
  atualizarUmUsuario: async (req, h) => {
    const response = await atualizarUmUsuario(
      req.server.mongo.db,
      req.params.id,
      req.payload
    );
    return h.response(response).code(response.statusCode);
  },
  deletarUmUsuario: async (req, h) => {
    const response = await deletarUmUsuario(req.server.mongo.db, req.params.id);
    return h.response().code(response.statusCode);
  },
};
