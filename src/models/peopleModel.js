const mongoose = require('mongoose')

const { Schema } = mongoose // traer la propiedad schema de mongoose, nos permite crear modelos/esquemas

const peopleModel = new Schema({
  firstName: { type: String, required: true, minLength: 3, maxLength: 30 },
  lastName: { type: String, required: true, minLength: 3, maxLength: 30 },
  username: { type: String, required: true, minLength: 3, maxLength: 30, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true }
})

// nombre y el obj modelo
module.exports = mongoose.model('People', peopleModel)
