const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  status: { type: Boolean, default: true }, // true means account is active.
  fname: String,
  lname: String,
  mobile: Number,
  email_verification: { type: Boolean, default: false },
  profile_picture: String,
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  coupon_used: [String],
});

const UserDetail = mongoose.model('UserDetail', UserDetailSchema);

module.exports = UserDetail;
