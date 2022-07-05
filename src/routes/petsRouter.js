const express = require('express')
const petsController = require('../controllers/petsController')
const validator = require('express-joi-validation').createValidator({})
const { bodySchema, querySchema, paramsSchema } = require('../validations/petsValidators')

const router = (Pets) => { // Importo por parámetro el modelo
  const petsRouter = express.Router() // De express traemos su objeto router y lo guardamos

  const { getAllPets, getPetById, postPets, putPetById, deletePetById } = petsController(Pets)

  petsRouter
    .route('/pets')
    .get(validator.query(querySchema), getAllPets)
    .post(validator.body(bodySchema), postPets)

  petsRouter
    .route('/pets/:id')
    .get(validator.params(paramsSchema), getPetById)
    .put(validator.body(bodySchema), putPetById)
    .delete(validator.params(paramsSchema), deletePetById)

  return petsRouter
}

// exportar la función como modulo
module.exports = router
