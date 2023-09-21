const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  req_type: String,
  status: String,
  product_ordered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  color: [String],
  size_ordered: [String],
  quantity_ordered: [Number],
  coupon_used: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
  offer_used: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
  total_amount: Number,
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: Date.now() },
});

const OrderDetails = mongoose.model('Order', orderSchema);

module.exports = OrderDetails;
