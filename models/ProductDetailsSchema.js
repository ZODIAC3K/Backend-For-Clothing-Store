const mongoose = require('mongoose');


const stockDetailsSchema = new mongoose.Schema({
  stock_details_id: { type: String, required: true },
  size: { type: String, required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});


const productVariantSchema = new mongoose.Schema({
  product_variant_id: { type: String, required: true },
  color: { type: String, required: true },
  stock: [stockDetailsSchema],
  image: [String],
  created_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});


const productDetailsSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: [String], required: true },
  brand: { type: [String], required: true },
  variant_details: { type: [productVariantSchema], required: true },
  rating: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});


const ProductDetails = mongoose.model('ProductDetails', productDetailsSchema);


module.exports = ProductDetails;
