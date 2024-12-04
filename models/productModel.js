const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("products", productSchema);