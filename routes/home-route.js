const router = require('express').Router()

router.get('/',async (req, res) => {
   res.render('index', {
      title: 'UStore | Home page',
      activePath: '/',
      bigTitle: 'Home',
      user: req.user
   })
})

module.exports = {
   path: '/',
   router
}