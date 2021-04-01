import { Boom } from '@hapi/boom';
import {
  logar,
  atualizarUmUsuario,
  deletarUmUsuario,
  obterTodosUsuarios,
  obterUmUsuario,
  salvarUmUsuario,
} from '../../services/UsuariosServices.js';

export default {
  login: async (req, h) => {
    return logar(req.server.mongo.db, req.headers)
      .then((token) => {
        return h.response({ token });
      })
      .catch((error) => {
        return new Boom(error, { statusCode: 401 });
      });
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
