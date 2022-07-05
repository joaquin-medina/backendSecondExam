const jwt = require('jsonwebtoken')

const generateToken = () => {
  const token = jwt.sign({
    data: 'Info here.'
  },
  process.env.SECRET
  )

  return token
}

module.exports = generateToken
