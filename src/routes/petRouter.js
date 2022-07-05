const express = require('express')
const petController = require('../controllers/petController')
const validator = require('express-joi-validation').createValidator({})
const { bodySchema, querySchema, paramsSchema } = require('../validations/petValidators')

const router = (Pet) => { // Importo por parámetro el modelo
  const petRouter = express.Router() // De express traemos su objeto router y lo guardamos

  const { getAllPet, getPetById, postPet, putPetById, deletePetById } = petController(Pet)

  petRouter
    .route('/pet')
    .get(validator.query(querySchema), getAllPet)
    .post(validator.body(bodySchema), postPet)

  petRouter
    .route('/pet/:id')
    .get(validator.params(paramsSchema), getPetById)
    .put(validator.body(bodySchema), putPetById)
    .delete(validator.params(paramsSchema), deletePetById)

  return petRouter
}

// exportar la función como modulo
module.exports = router
