import relatosController from '../../controllers/relatos/index.js';
import {
  idValido,
  relatoValidoAtualizar,
  relatoValidoSalvar,
} from '../../validators/index.js';

const API_PREFIX = '/api/v1';
const RELATOS_PATH = `${API_PREFIX}/relatos`;

export default [
  {
    method: 'GET',
    path: RELATOS_PATH,
    handler: relatosController.obterRelatos,
  },
  {
    method: 'GET',
    path: `${RELATOS_PATH}/{id}`,
    handler: relatosController.obterUmRelato,
    options: {
      validate: {
        params: idValido,
      },
    },
  },
  {
    method: 'POST',
    path: RELATOS_PATH,
    handler: relatosController.salvarUmRelato,
    options: {
      validate: {
        payload: relatoValidoSalvar,
      },
    },
  },
  {
    method: 'PATCH',
    path: `${RELATOS_PATH}/{id}`,
    handler: relatosController.atualizarUmRelato,
    options: {
      validate: {
        params: idValido,
        payload: relatoValidoAtualizar,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${RELATOS_PATH}/{id}`,
    handler: relatosController.deletarUmRelato,
    options: {
      validate: {
        params: idValido,
      },
    },
  },
];
