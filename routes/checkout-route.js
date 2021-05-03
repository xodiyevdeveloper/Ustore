const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('checkout', {
      title: 'UStore | Checkout page',
      activePath: '/checkout',
      bigTitle: 'Checkout',
      user: req.user
   })
})

module.exports = {
   path: '/checkout',
   router
}