import MongoDbRepository from './MongodbRepository.js';

class UsuarioRepository extends MongoDbRepository {
  constructor(db) {
    super(db, 'Usuarios');
  }
}

export default UsuarioRepository;
