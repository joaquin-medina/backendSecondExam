const Joi = require('joi')

const bodySchema = Joi.object({ // BODY Conjunto de datos
  firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
  lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(9).max(13).required()
})

const paramsSchema = // PARAMS ID parámetro específico
    Joi.object({
      id: Joi.string().min(24).max(24).required()
    })

const querySchema = Joi.alternatives().try( // QUERY Filtrar
  Joi.object({
    firstName: Joi.string().required()
  }),
  Joi.object({
    lastName: Joi.string().required()
  }),
  Joi.object({
    username: Joi.string().required()
  }),
  Joi.object({
    email: Joi.string().required()
  }),
  Joi.object({
    address: Joi.string().required()
  }),
  Joi.object({
    phone: Joi.string().required()
  }),
  Joi.object({})
)

const authBodySchema = Joi.object({
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string().required()
})

module.exports = { bodySchema, paramsSchema, querySchema, authBodySchema }
