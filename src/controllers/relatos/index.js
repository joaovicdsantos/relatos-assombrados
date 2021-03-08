import RelatoRepository from '../../repositories/RelatoRepository.js';
import Response from '../../models/Response.js';

const gerarRepository = (req) => {
  return new RelatoRepository(req.server.mongo.db);
};

export default {
  obterRelatos: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.list();
    const response = new Response(200, result);
    return h.response(response.toString());
  },
  obterUmRelato: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.getById(req.params.id);
    const response = new Response(200, result);
    return h.response(response.toString());
  },
  salvarUmRelato: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.insert(req.payload);
    const response = new Response(201, result);
    return h.response(response.toString()).code(response.statusCode);
  },
  atualizarUmRelato: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.update(req.params.id, req.payload);
    const response = new Response(202, result);
    return h.response(response.toString()).code(response.statusCode);
  },
  deletarUmRelato: async (req, h) => {
    const repository = gerarRepository(req);
    const result = await repository.delete(req.params.id);
    const response = new Response(204, result);
    return h.response().code(response.statusCode);
  },
};
