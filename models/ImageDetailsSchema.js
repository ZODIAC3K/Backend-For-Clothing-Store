const mongoose = require('mongoose');

const imageDetailsSchema = new mongoose.Schema({
  image_details_id: { type: String, required: true },
  data: { type: String, required: true }, // Store as base64-encoded data
  content_type: { type: String, required: true },
});

const ImageDetails = mongoose.model('ImageDetails', imageDetailsSchema);

module.exports = ImageDetails;
