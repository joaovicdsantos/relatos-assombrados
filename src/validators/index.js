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
