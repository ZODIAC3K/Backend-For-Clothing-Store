const mongoose = require('mongoose');

const returnDetailsSchema = new mongoose.Schema({
  return_details_id: { type: String, required: true },
  order_details_id: { type: String, required: true },
  user_details_id: { type: String, required: true },
  req_type: { type: String, required: true },
  status: { type: String, required: true },
  product_ordered: { type: [String], required: true },
  color: { type: [String], required: true },
  size_ordered: { type: [String], required: true },
  quantity_ordered: { type: [Number], required: true },
  coupon_used: { type: [String], required: true },
  offer_used: { type: String, required: true },
  total_amount: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});

const ReturnDetails = mongoose.model('ReturnDetails', returnDetailsSchema);

module.exports = ReturnDetails;
