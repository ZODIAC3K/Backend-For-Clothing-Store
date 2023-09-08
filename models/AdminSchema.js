const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  admin_id: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  status: { type: Boolean, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  mobile: { type: Number, required: true },
  email_verification: { type: Boolean, required: true },
  profile_picture: { type: String, required: true },
  Encountered: { type: [String], required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
