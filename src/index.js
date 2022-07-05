const express = require('express') // requerir express
const People = require('./models/peopleModel') // requerir el modelo People
const Pets = require('./models/petsModel')
const peopleRouter = require('./routes/peopleRouter')(People) // importar e inyección
const authRouter = require('./routes/authRouter')(People)
const petsRouter = require('./routes/petsRouter')(Pets)
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')
require('dotenv').config()
const { expressjwt } = require('express-jwt')

const app = express() // activarlo

require('./database/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all(
  '/*',
  expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
    path: ['/auth/login', '/auth/register', '/api/pets']
  })
)

app.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(httpStatus.UNAUTHORIZED).json({
      error: err.name,
      cause: 'Unauthorized. Missing or invalid token provided.'
    })
  } else {
    next(err)
  }
})

app.use('/api', peopleRouter, petsRouter)
app.use('/', authRouter)

app.use(errorHandler)

app.listen(5000, () => { // levantar servidor
  console.log('Server is running.')
})
