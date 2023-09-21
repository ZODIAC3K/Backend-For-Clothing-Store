const mongoose = require('mongoose');


const stockDetailSchema = new mongoose.Schema({
  color: String,
  size: String,
  amount: Number,
  quantity: Number,
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: Date.now() },
});

const productVarientSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  stock: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StockDetail' }],
  image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImageDetail' }],
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: Date.now() },
});


const productDetailsSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  brand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
  varient_details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVarient' }],
  rating: Number,
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: Date.now() },
});


const Product = mongoose.model('Product', productDetailsSchema);
const ProductVarient = mongoose.model('ProductVarient', productVarientSchema);
const StockDetail = mongoose.model('StockDetail', stockDetailSchema)

module.exports = { 
  Product,
  ProductVarient,
  StockDetail, 
};
