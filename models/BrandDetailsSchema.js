const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  brand_name: String,
  created_at: { type: Date, default: Date.now() },
});

const BrandDetails = mongoose.model('Brand', brandSchema);

module.exports = BrandDetails;
