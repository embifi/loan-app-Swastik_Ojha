const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
    repaymentID: Number,
    loanType: String,
    loanAmount: Number,
    interestRate: Number,
    term: Number,
    schedules: [],
    totalInterest: Number,
});

const customerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    repayments: [repaymentSchema],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
