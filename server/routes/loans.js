// server/routes/loans.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../authMiddleware');


let loans = [
    {
        id: '1',
        loanAmount: 10000,
        interestRate: 5,
        loanTerm: 12,
        loanType: 'Personal Loan',
    },
    {
        id: '2',
        loanAmount: 20000,
        interestRate: 6,
        loanTerm: 24,
        loanType: 'Business Loan',
    },

];;

// Create a new loan
router.post('/loans', authenticateToken, async (req, res) => {
    const { loanAmount, interestRate, loanTerm, loanType } = req.body;
    const newLoan = {
        id: Date.now().toString(),
        loanAmount,
        interestRate,
        loanTerm,
        loanType,
    };
    loans.push(newLoan);
    res.status(201).json(newLoan);
});

// Get all loans
router.get('/loans', authenticateToken, async (req, res) => {
    res.json(loans);
});



// Update loan by ID
router.put('/loans/:id', (req, res) => {
    const loanId = req.params.id;
    const { loanAmount, interestRate, loanTerm, loanType } = req.body;
    const loanIndex = loans.findIndex((loan) => loan.id === loanId);
    if (loanIndex !== -1) {
        loans[loanIndex] = {
            id: loanId,
            loanAmount,
            interestRate,
            loanTerm,
            loanType,
        };
        res.json(loans[loanIndex]);
    } else {
        res.status(404).json({ message: 'Loan not found' });
    }
});

// Delete loan by ID
router.delete('/loans/:id', authenticateToken, async (req, res) => {
    const loanId = req.params.id;
    loans = loans.filter((loan) => loan.id !== loanId);
    res.json({ message: 'Loan deleted successfully' });
});

module.exports = router;
