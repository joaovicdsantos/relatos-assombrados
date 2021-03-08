import UsuarioRepository from '../../repositories/UsuarioRepository.js';
import Response from '../../models/Response.js';
import { login } from '../../helpers/login.js';
import { Boom } from '@hapi/boom';
import { gerarHashSenha } from '../../helpers/bcrypt.js';

const gerarRepository = (req) => {
  return new UsuarioRepository(req.server.mongo.db);
};

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
    const repository = gerarRepository(req);
    const result = await repository.list();
    const response = new Response(200, result);
    return h.response(response.toString());
  },
  obterUmUsuario: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.getById(req.params.id);
    let response;
    if (!result) response = new Response(404, {}, 'Nenhum usuário encontrado');
    else response = new Response(200, result);
    return h.response(response.toString()).code(response.statusCode);
  },
  salvarUmUsuario: async (req, h) => {
    const repository = gerarRepository(req);
    req.payload.senha = await gerarHashSenha(req.payload.senha);
    const result = await repository.insert(req.payload);
    const response = new Response(201, result);
    return h.response(response.toString()).code(response.statusCode);
  },
  atualizarUmUsuario: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.update(req.params.id, req.payload);
    const response = new Response(202, result);
    return h.response(response.toString()).code(response.statusCode);
  },
  deletarUmUsuario: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.delete(req.params.id);
    const response = new Response(204, result);
    return h.response().code(response.statusCode);
  },
};
