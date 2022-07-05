const httpStatus = require('../helpers/httpStatus')

const petsController = (Pets) => {
// GET ALL
  const getAllPets = async (req, res, next) => {
    try {
      const { query } = req
      const response = await Pets.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  // POST
  const postPets = async (req, res, next) => {
    try {
      const { body } = req

      const pets = await new Pets(body)

      await pets.save()

      return res.status(httpStatus.CREATED).json(pets)
    } catch (err) {
      next(err)
    }
  }

  // GET BY ID
  const getPetById = async (req, res, next) => {
    try {
      const { params } = req

      const response = await Pets.findById(params.id)

      res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  // PUT
  const putPetById = async (req, res, next) => {
    try {
      const { params, body } = req

      const checkData = await Pets.find({
        _id: params.id
      })

      if (checkData === null) {
        return res.status(httpStatus.FORBIDDEN).send('No data found with the provided ID.')
      }

      await Pets.updateOne(
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

      await Pets.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      next(err)
    }
  }

  return { getAllPets, getPetById, postPets, putPetById, deletePetById }
}

module.exports = petsController
