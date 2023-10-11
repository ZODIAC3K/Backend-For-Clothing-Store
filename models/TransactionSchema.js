const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    // write transaction schema ( refer razorpay )
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;