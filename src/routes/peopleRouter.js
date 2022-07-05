const express = require('express')
const peopleController = require('../controllers/peopleController')
const validator = require('express-joi-validation').createValidator({})
const { bodySchema, querySchema, paramsSchema } = require('../validations/peopleValidators')

const router = (People) => { // Importo por parámetro el modelo
  const peopleRouter = express.Router() // De express traemos su objeto router y lo guardamos

  const { getAllPeople, getPeopleById, postPeople, putPeopleById, deletePeopleById } = peopleController(People)

  peopleRouter
    .route('/people')
    .get(validator.query(querySchema), getAllPeople)
    .post(validator.body(bodySchema), postPeople)

  peopleRouter
    .route('/people/:id')
    .get(validator.params(paramsSchema), getPeopleById)
    .put(validator.body(bodySchema), putPeopleById)
    .delete(validator.params(paramsSchema), deletePeopleById)

  return peopleRouter
}

// exportar la función como modulo
module.exports = router
