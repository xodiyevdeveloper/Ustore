const router = require('express').Router()
const Joi = require('joi')
const User = require('../models/user')
const {generateHash} = require('../modules/bcrypt')
const {generateToken} = require('../modules/jwt')
const {ifUserDontEnter} = require('../middlewares/user-middleware')

const signUpValidateSchema = Joi.object({
   name: Joi.string()
      .min(3)
      .max(32)
      .required(),
   email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'uz'] } }),
   password: Joi.string()
      .min(4)
})
router.get('/', ifUserDontEnter, async (req, res) => {
   res.render('signup', {
      title: 'UStore | Sign up',
      activePath: '/signup',
      bigTitle: 'Sign Up'
   })
})

router.post('/', ifUserDontEnter, async (req, res) => {
   try {
      const validData = signUpValidateSchema.validate(req.body)

      if (validData.error) throw validData.error.details[0].message

      const {name, email, password} = validData.value

      const candidate = await User.findOne({ email })

      if (candidate) throw 'This email is already in use. Please login by this email'

      const newUser = new User({
         name, email, password: generateHash(password)
      })

      await newUser.save()

      const token = generateToken(email)

      res.cookie('token', token)

      res.redirect('/')
   } catch (e) {
      res.render('signup', {
         title: 'UStore | Sign up',
         activePath: '/signup',
         bigTitle: 'Sign Up',
         error: e + ''
      })
   }
})

module.exports = {
   path: '/signup',
   router
}