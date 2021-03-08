import usuariosController from '../../controllers/usuarios/index.js';
import {
  idValido,
  usuarioValidoAtualizar,
  usuarioValidoSalvar,
} from '../../validators/index.js';

const API_PREFIX = '/api/v1';
const USUARIOS_PATH = `${API_PREFIX}/usuarios`;

export default [
  {
    method: 'POST',
    path: `${USUARIOS_PATH}/login`,
    handler: usuariosController.login,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: USUARIOS_PATH,
    handler: usuariosController.obterUsuarios,
  },
  {
    method: 'GET',
    path: `${USUARIOS_PATH}/{id}`,
    handler: usuariosController.obterUmUsuario,
    options: {
      validate: {
        params: idValido,
      },
    },
  },
  {
    method: 'POST',
    path: USUARIOS_PATH,
    handler: usuariosController.salvarUmUsuario,
    options: {
      validate: {
        payload: usuarioValidoSalvar,
      },
      auth: false,
    },
  },
  {
    method: 'PATCH',
    path: `${USUARIOS_PATH}/{id}`,
    handler: usuariosController.atualizarUmUsuario,
    options: {
      validate: {
        params: idValido,
        payload: usuarioValidoAtualizar,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${USUARIOS_PATH}/{id}`,
    handler: usuariosController.deletarUmUsuario,
    options: {
      validate: {
        params: idValido,
      },
    },
  },
];
