const mongoose = require('mongoose');

const bannerDetailsSchema = new mongoose.Schema({
  banner_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  applicable_product: { type: [String], required: true },
  image: { type: String, required: true },
});

const BannerDetails = mongoose.model('BannerDetails', bannerDetailsSchema);

module.exports = BannerDetails;
