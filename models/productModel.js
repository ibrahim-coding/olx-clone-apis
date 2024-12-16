const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  type: String,
  title: String,
  description: String,
  price: Number,
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("products", productSchema);
