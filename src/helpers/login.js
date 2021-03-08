import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import { compararHashSenha } from '../helpers/bcrypt.js';

const TOKEN_PREFIX = 'Bearer';

export const verificarUsuario = async ({ usuario, senha }, db) => {
  return new Promise(async (resolve, reject) => {
    const repository = new UsuarioRepository(db);
    let result = await repository.get({ usuario });
    if (!result) reject('Senha ou nome de usuário inválidos');
    if (await compararHashSenha(senha, result.senha))
      reject('Senha ou nome de usuário inválidos');
    else resolve();
  });
};

export const login = async (authorization, db) => {
  return new Promise((resolve, reject) => {
    const [scheme, hash] = authorization.split(' ');
    if (scheme !== 'Basic') {
      reject('Invalid authorization token.');
    }
    const credenciais = Buffer.from(hash, 'base64').toString();
    const [usuario, senha] = credenciais.split(':');

    if (!usuario || !senha) {
      reject('Invalid authorization token.');
    }

    verificarUsuario({ usuario, senha }, db)
      .then(() => {
        const token = jwt.sign(
          { sub: usuario.toString() },
          process.env.API_KEY
        );
        resolve(`${TOKEN_PREFIX} ${token}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
