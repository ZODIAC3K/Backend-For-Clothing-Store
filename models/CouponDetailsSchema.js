const mongoose = require('mongoose');

const couponDetailsSchema = new mongoose.Schema({
  coupon_id: { type: String, required: true },
  discount: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});

const CouponDetails = mongoose.model('CouponDetails', couponDetailsSchema);

module.exports = CouponDetails;
