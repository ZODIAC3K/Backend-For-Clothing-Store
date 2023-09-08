const mongoose = require('mongoose');

const categoryDetailsSchema = new mongoose.Schema({
  category_details_id: { type: String, required: true },
  category_name: { type: String, required: true },
  created_at: { type: Date, required: true },
});

const CategoryDetails = mongoose.model('CategoryDetails', categoryDetailsSchema);

module.exports = CategoryDetails;
