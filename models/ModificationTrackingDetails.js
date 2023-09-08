// Import the mongoose library
const mongoose = require('mongoose');

const orderDetailsSchema = require('./OrderDetailsSchema');


const modificationTrackingDetailsSchema = new mongoose.Schema({
  modification_tracking_id: { type: String, required: true },
  modification_type: { type: String, required: true },
  order: { type: orderDetailsSchema, required: true },
});

const ModificationTrackingDetails = mongoose.model('ModificationTrackingDetails', modificationTrackingDetailsSchema);

module.exports = ModificationTrackingDetails;
