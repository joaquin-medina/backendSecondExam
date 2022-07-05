const mongoose = require('mongoose')

const { Schema } = mongoose // traer la propiedad schema de mongoose, nos permite crear modelos/esquemas

const petModel = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  species: { type: String, required: true, maxLength: 20 },
  race: { type: String, required: true, maxLength: 20 },
  age: { type: String, required: true, maxLength: 2 },
  diagnosis: { type: String, required: true },
  owner: { type: String, required: true, minLength: 3, maxLength: 30 }
})

// exporto nombre y el obj modelo
module.exports = mongoose.model('Pet', petModel)
