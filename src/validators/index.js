import Joi from 'joi';

// Banco de dados
export const usuarioJaCadastrado = async (repository, usuario) => {
  return new Promise(async (resolve, reject) => {
    // Verificar usuário
    let validarUsuario;
    validarUsuario = await repository.get({
      usuario: { $regex: new RegExp(usuario.usuario, 'i') },
    });
    if (validarUsuario) {
      reject('Usuário já cadastrado');
    }
    validarUsuario = await repository.get({
      email: { $regex: new RegExp(usuario.email, 'i') },
    });
    if (validarUsuario) {
      reject('Email já registrado');
    }
    resolve(usuario);
  });
};

// Models
export const idValido = Joi.object({
  id: Joi.string().alphanum(),
});

export const relatoValidoSalvar = Joi.object({
  titulo: Joi.string().required(),
  conteudo: Joi.string().required(),
  categoria: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  autor: Joi.string().default('Anônimo'),
});

export const relatoValidoAtualizar = Joi.object({
  titulo: Joi.string(),
  conteudo: Joi.string(),
  categoria: Joi.string().alphanum(),
  tags: Joi.array().items(Joi.string()),
});

export const usuarioValidoSalvar = Joi.object({
  usuario: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
  sexo: Joi.string().valid('Masculino', 'Feminino', 'Outro').required(),
});

export const usuarioValidoAtualizar = Joi.object({
  usuario: Joi.string(),
  email: Joi.string().email(),
  senha: Joi.string(),
  sexo: Joi.string().valid('Masculino', 'Feminino', 'Outro'),
});
