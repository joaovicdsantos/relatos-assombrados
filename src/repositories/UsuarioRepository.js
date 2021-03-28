import MongoDbRepository from './MongodbRepository.js';

class UsuarioRepository extends MongoDbRepository {
  constructor(db) {
    super(db, 'Usuarios');
  }

  async getById(id) {
    const usuario = await super.getById(id);
    return removerSenha(usuario);
  }

  async insert(doc) {
    const usuario = await super.insert(doc);
    return removerSenha(usuario);
  }
}

function removerSenha(usuario) {
  if (usuario) {
    usuario.senha = undefined;
    return usuario;
  } else {
    return undefined;
  }
}

export default UsuarioRepository;
