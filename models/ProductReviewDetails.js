const mongoose = require('mongoose');

const productReviewDetailsSchema = new mongoose.Schema({
  product_review_id: { type: String, required: true },
  user_id: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true },
  image_details_id: { type: [String], required: true },
});

const ProductReviewDetails = mongoose.model('ProductReviewDetails', productReviewDetailsSchema);

module.exports = ProductReviewDetails;
