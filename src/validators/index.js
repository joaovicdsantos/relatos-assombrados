import Joi from 'joi';

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
