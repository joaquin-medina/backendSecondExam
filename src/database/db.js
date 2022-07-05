const mongoose = require('mongoose')

console.log('Connecting to MongoDB...')

mongoose
  .connect('mongodb://127.0.0.1/people')// crear y conectar a la database  uso node v.18
  .then(() => console.log('The database is connected.'))
  .catch((err) => console.log('Could not connect to database. \n', err))
