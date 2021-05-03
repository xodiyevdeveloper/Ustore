const router = require('express').Router()
const Joi = require('joi')
const {ifUserDontEnter} = require('../middlewares/user-middleware')
const User = require('../models/user')
const {compareHash} = require('../modules/bcrypt')
const {generateToken} = require('../modules/jwt')

const loginValidateSchema = Joi.object({
   email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'uz'] } }),
   password: Joi.string()
      .min(4)
})

router.get('/', ifUserDontEnter, async (req, res) => {
   res.render('login', {
      title: 'UStore | Login',
      activePath: '/login',
      bigTitle: 'Login'
   })
})

router.post('/', ifUserDontEnter, async (req, res) => {
   try {
      const validData = loginValidateSchema.validate(req.body)

      if (validData.error) throw validData.error.details[0].message

      const {email, password} = validData.value

      const candidate = await User.findOne({ email })

      if (!candidate) throw 'User not found by this email'

      const isPasswordCorrect = compareHash(password, candidate.password)

      if (!isPasswordCorrect) throw 'Password incorrect'

      const token = generateToken(email)

      res.cookie('token', token).redirect('/')
   } catch (e) {
      res.render('login', {
         title: 'UStore | Login',
         activePath: '/login',
         bigTitle: 'Login',
         error: e + ''
      })
   }
})

module.exports = {
   path: '/login',
   router
}