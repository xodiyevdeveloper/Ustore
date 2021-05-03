const bcrypt = require('bcrypt')

const generateHash = data => bcrypt.hashSync(data, bcrypt.genSaltSync(10))

const compareHash = (data, hash) => bcrypt.compareSync(data, hash)

module.exports = { generateHash, compareHash }