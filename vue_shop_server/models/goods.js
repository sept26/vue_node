let mongoose = require('mongoose')
let productSchema = new mongoose.Schema({
  "productId": String,
  "productName": String,
  "salePrice": Number,
  "productImage": String,
  "checked": String,
  "productNum": String
})

module.exports = mongoose.model('Good', productSchema)