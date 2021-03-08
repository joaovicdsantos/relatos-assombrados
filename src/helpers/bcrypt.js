import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const gerarHashSenha = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const compararHashSenha = async (textPassword, hashPassword) => {
  return !(await bcrypt.compare(textPassword, hashPassword));
};
