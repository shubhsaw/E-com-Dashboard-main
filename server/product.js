const mongoose = require('./db');  // use shared connection

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  company: String,
  desc: String,
  rating: Number,
  userId: String
});

module.exports = mongoose.model("products", productSchema);
