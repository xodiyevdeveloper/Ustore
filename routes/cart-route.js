const router = require('express').Router()
const {ifNotUserDontEnter} = require('../middlewares/user-middleware')
const Product = require('../models/product')
const User = require('../models/user')

router.get('/', ifNotUserDontEnter, async (req, res) => {
   const user = await User.findById(req.user._id)
   let { cart, totalPrice } = user
   console.log(cart)
   res.render('cart', {
      title: 'UStore | Cart',
      activePath: '/cart',
      bigTitle: 'Cart',
      user: req.user,
      cart,
      totalPrice
   })
})

router.post('/add', async (req, res) => {
   const { id } = req.body
   const product = await Product.findById(id)
   const { _id, title, img, price } = product
   const user = await User.findById(req.user._id)
   let { cart, totalPrice } = user

   const idx = cart.findIndex(p => p.productId.toString() === _id.toString())

   if (idx === -1) {
      cart.push({
         count: 1,
         price: price,
         name: title,
         img: img,
         totalPrice: price,
         productId: _id
      })
      console.log(totalPrice)
      totalPrice += price
      console.log(totalPrice)
      await User.findByIdAndUpdate(req.user._id, {
         cart, totalPrice
      })
      return res.send({
         ok: true
      })
   }

   const existProduct = cart[idx]
   existProduct.count = existProduct.count + 1
   existProduct.totalPrice += existProduct.price
   totalPrice += existProduct.price
   cart[idx] = existProduct
   await User.findByIdAndUpdate(req.user._id, {
      cart, totalPrice
   })
   return res.send({
      ok: true
   })
})

module.exports = {
   path: '/cart',
   router
}