import MongoDbRepository from './MongodbRepository.js';

class RelatoRepository extends MongoDbRepository {
  constructor(db) {
    super(db, 'Relatos');
  }
}

export default RelatoRepository;
