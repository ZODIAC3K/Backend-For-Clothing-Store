const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    // write transaction schema ( refer razorpay )
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {Transaction, transactionSchema};