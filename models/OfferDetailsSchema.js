const mongoose = require('mongoose');

const offerDetailsSchema = new mongoose.Schema({
  offer_id: { type: String, required: true },
  offer_discount: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});

const OfferDetails = mongoose.model('OfferDetails', offerDetailsSchema);

module.exports = OfferDetails;
