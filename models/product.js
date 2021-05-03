const {Schema, model} = require('mongoose')

const productSchema = new Schema({
   title: String,
   img: String,
   price: Number
}, {collection: 'products'})

module.exports = model('Product', productSchema)