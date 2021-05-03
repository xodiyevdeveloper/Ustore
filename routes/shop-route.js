const router = require('express').Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
   const products = await Product.find()

   res.render('shop', {
      title: 'UStore | Shop page',
      activePath: '/shop',
      bigTitle: 'Shop',
      user: req.user,
      products
   })
})

module.exports = {
   path: '/shop',
   router
}