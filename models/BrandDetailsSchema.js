const mongoose = require('mongoose');

const brandDetailsSchema = new mongoose.Schema({
  brand_id: { type: String, required: true },
  brand_name: { type: String, required: true },
  created_at: { type: Date, required: true },
});

const BrandDetails = mongoose.model('BrandDetails', brandDetailsSchema);

module.exports = BrandDetails;
