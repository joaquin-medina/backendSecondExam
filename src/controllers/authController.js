const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateTokens')
const httpStatus = require('../helpers/httpStatus')

// LOGIN
const authController = (People) => {
  const logIn = async (req, res, next) => {
    try {
      const { body } = req

      const user = await People.findOne({
        username: body.username
      })

      if (
        user === null ||
        !(await bcrypt.compare(body.password, user.password)) // body: contraseña por petición. user: contraseña guardada
      ) {
        return res.status(httpStatus.FORBIDDEN).send('Invalid credentials')
      }

      const token = generateToken()

      return res.status(httpStatus.OK).json({
        status: 'OK, Logged In - ¡Welcome!',
        token
      })
    } catch (err) {
      next(err)
    }
  }

  // REGISTRO
  const register = async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const people = await new People(encryptedData)

      await people.save()

      return res.status(httpStatus.CREATED).json(people)
    } catch (err) {
      next(err)
    }
  }

  return { logIn, register }
}

module.exports = authController
