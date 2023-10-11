const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail' },
    addresses: [{
        firstLine: {type: String, required: true},
        secondLine: String,
        pincode: {type: Number, required: true},
        city: { type: String, required: true },
        state: { type: String, required: true },
        default: { type: Boolean, default: false }
    }]
})

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;