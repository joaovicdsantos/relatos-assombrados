import Response from '../models/Response.js';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import { usuarioJaCadastrado } from '../validators/index.js';
import { login } from '../helpers/login.js';
import { gerarHashSenha } from '../helpers/bcrypt.js';

const gerarRepository = (conn) => {
  return new UsuarioRepository(conn);
};

export const obterTodosUsuarios = async (conn) => {
  const repository = gerarRepository(conn);
  const result = await repository.list();
  return new Response(200, result);
};

export const obterUmUsuario = async (conn, id) => {
  const repository = gerarRepository(conn);
  const result = await repository.getById(id);
  if (!result) {
    return new Response(404, {}, 'Não existe nenhum usuário com esse id');
  } else {
    return new Response(200, result);
  }
};

export const salvarUmUsuario = async (conn, usuario) => {
  const repository = gerarRepository(conn);
  return usuarioJaCadastrado(repository, usuario)
    .then(async (usuarioValidado) => {
      usuarioValidado.senha = await gerarHashSenha(usuarioValidado.senha);
      const result = await repository.insert(usuarioValidado);
      return new Response(201, result);
    })
    .catch((erro) => {
      return new Response(409, {}, erro);
    });
};

export const atualizarUmUsuario = async (conn, id, usuario) => {
  const repository = gerarRepository(conn);
  const usuarioValidado = await repository.getById(id);
  if (!usuarioValidado) {
    return new Response(
      404,
      {},
      'Não existe nenhum usuário com esse id para ser atualizado'
    );
  }
  usuario.senha = await gerarHashSenha(usuario.senha);
  await repository.update(id, usuario);
  return new Response(202, {}, 'Atualizado com sucesso!');
};

export const deletarUmUsuario = async (conn, id) => {
  const repository = gerarRepository(conn);
  await repository.delete(id);
  return new Response(204, {});
};
