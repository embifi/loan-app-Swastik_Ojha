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
    const newCustomer = {
        id: Date.now().toString(),
        loanAmount,
        interestRate,
        loanTerm,
        loanType,
    };
    loans.push(newCustomer);
    res.status(201).json(newCustomer);
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




// list of customers
const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more customer objects here
];

// API endpoint to get the list of customers
router.get('/customers', (req, res) => {
    res.json({ customers });
});

function generateRepaymentSchedule(loanAmount, interestRate, tenureMonths) {
    const monthlyPayment = loanAmount / tenureMonths;
    const repaymentSchedule = [];

    for (let i = 1; i <= tenureMonths; i++) {
        const paymentDueDate = new Date(); // You would need to calculate actual due dates here
        const paymentAmount = monthlyPayment;
        repaymentSchedule.push({ paymentDueDate, paymentAmount });
    }

    return repaymentSchedule;
}

router.get('/customers/:id/repayment', (req, res) => {
    const customerId = parseInt(req.params.id);
    const customer = customers.find(cust => cust.id === customerId);

    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    const loanAmount = 10000; // Example loan amount
    const interestRate = 0.05; // Example interest rate
    const tenureMonths = 5; // Example loan tenure in months

    const repaymentSchedule = generateRepaymentSchedule(loanAmount, interestRate, tenureMonths);

    res.json({ customer, repaymentSchedule });
});







module.exports = router;
