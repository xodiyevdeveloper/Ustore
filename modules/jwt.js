const Jwt = require('jsonwebtoken')
const SECRET_WORD = 'lutfulla'

const generateToken = data => Jwt.sign(data, SECRET_WORD)
const verifyToken = token => Jwt.verify(token, SECRET_WORD)

module.exports = {generateToken, verifyToken}