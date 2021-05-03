const {verifyToken} = require('../modules/jwt')
const User = require('../models/user')

module.exports = async (req, res, next) => {
   const token = req.cookies.token

   if (token) {
      const email = verifyToken(token)

      const user = await User.findOne({email})

      if (user) {
         req.user = user
      }
   }
   next()
}