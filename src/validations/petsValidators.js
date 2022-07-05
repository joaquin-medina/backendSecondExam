const Joi = require('joi')

const bodySchema = Joi.object({
  name: Joi.string().min(2).max(30).trim().required(),
  species: Joi.string().max(20).trim().required(),
  race: Joi.string().max(20).required(),
  age: Joi.string().required().max(2),
  diagnosis: Joi.string().required(),
  owner: Joi.string().required().min(3).max(30).trim()
})

const paramsSchema =
    Joi.object({
      id: Joi.string().min(24).max(24).required()
    })

const querySchema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().required()
  }),
  Joi.object({
    species: Joi.string().required()
  }),
  Joi.object({
    race: Joi.string().required()
  }),
  Joi.object({
    age: Joi.string().required()
  }),
  Joi.object({
    diagnosis: Joi.string().required()
  }),
  Joi.object({
    owner: Joi.string().required()
  }),
  Joi.object({})
)

module.exports = { bodySchema, paramsSchema, querySchema }
