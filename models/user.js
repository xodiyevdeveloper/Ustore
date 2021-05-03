const {Schema, model} = require('mongoose')

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 3
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true,
      minlength: 4
   },
   totalPrice: {
      type: Number,
      default: 0
   },
   cart: [
      {
         count: Number,
         price: Number,
         name: String,
         img: String,
         totalPrice: {
            type: Number,
            default: 0
         },
         productId: Schema.Types.ObjectId,
      }
   ]
}, { collection: 'users' })

module.exports = model('User', userSchema)