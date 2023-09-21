const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  pass: { type: String, required: true }, // Store hashed password
  status: { type: Boolean, default: true },
  fname: String,
  lname: String,
  mobile: Number,
  email_verification: { type: Boolean, default: false },
  profile_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageDetail' },
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: Date.now() },
  coupon_used: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
});

const UserDetail = mongoose.model('UserDetail', UserDetailSchema);

module.exports = UserDetail;
