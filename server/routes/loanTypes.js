// server/routes/loanTypes.js
const express = require('express');
const router = express.Router();

// Sample data for loan types (you can replace this with a database later)
let loanTypes = [
    { id: '1', name: 'Personal Loan', interestRate: 5 },
    { id: '2', name: 'Business Loan', interestRate: 7 },
    { id: '3', name: 'Mortgage Loan', interestRate: 4.5 },
];

// Get all loan types
router.get('/loanTypes', (req, res) => {
    res.json(loanTypes);
});

// Get loan type by ID
router.get('/loanTypes/:id', (req, res) => {
    const loanTypeId = req.params.id;
    const loanType = loanTypes.find((type) => type.id === loanTypeId);
    if (loanType) {
        res.json(loanType);
    } else {
        res.status(404).json({ message: 'Loan type not found' });
    }
});

module.exports = router;
