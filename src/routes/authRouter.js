const express = require('express')
const authController = require('../controllers/authController')
const validator = require('express-joi-validation').createValidator({})
const { bodySchema, authBodySchema } = require('../validations/peopleValidators')

const router = (People) => { // Importo por parámetro el modelo
  const authRouter = express.Router() // De express traemos su objeto router y lo guardamos

  const { logIn, register } = authController(People)

  authRouter.route('/auth/login').post(validator.body(authBodySchema), logIn)

  authRouter.route('/auth/register').post(validator.body(bodySchema), register)

  return authRouter
}

// exportar la función como modulo
module.exports = router
