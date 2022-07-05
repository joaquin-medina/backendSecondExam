const httpStatus = require('../helpers/httpStatus')

const petController = (Pet) => {
// GET ALL
  const getAllPet = async (req, res, next) => {
    try {
      const { query } = req
      const response = await Pet.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  // POST
  const postPet = async (req, res, next) => {
    try {
      const { body } = req

      const pet = await new Pet(body)

      await pet.save()

      return res.status(httpStatus.CREATED).json(pet)
    } catch (err) {
      next(err)
    }
  }

  // GET BY ID
  const getPetById = async (req, res, next) => {
    try {
      const { params } = req

      const response = await Pet.findById(params.id)

      res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  // PUT
  const putPetById = async (req, res, next) => {
    try {
      const { params, body } = req

      const checkData = await Pet.find({
        _id: params.id
      })

      if (checkData === null) {
        return res.status(httpStatus.FORBIDDEN).send('No data found with the provided ID.')
      }

      await Pet.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            name: body.name,
            species: body.species,
            race: body.race,
            age: body.age,
            diagnosis: body.diagnosis,
            owner: body.owner
          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')
    } catch (err) {
      next(err)
    }
  }

  // DELETE
  const deletePetById = async (req, res, next) => {
    try {
      const { params } = req

      await Pet.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      next(err)
    }
  }

  return { getAllPet, getPetById, postPet, putPetById, deletePetById }
}

module.exports = petController
