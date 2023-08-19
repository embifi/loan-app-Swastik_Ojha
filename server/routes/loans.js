// server/routes/loans.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../authMiddleware');
const mongoose = require('mongoose');
const Customer = require('../models/customer');

// list of customers
//  will act as database
const customers = [
  {
    id: 1,
    name: 'John ',
    email: 'john@example.com',
    repayments: [

      {
        repaymentID: 11,
        loanType: 'aeroplane',
        loanAmount: 10404,
        interestRate: 3,
        tenure: 12,
        schedules: 895.58,
        totalInterest: 146.91

      },
      {
        repaymentID: 13,
        loanType: 'Yatch',
        loanAmount: 4000,
        interestRate: 3,
        tenure: 18,
        schedules: 222.94,
        totalInterest: 193

      },
      {
        repaymentID: 22,
        loanType: 'home',
        loanAmount: 150000,
        tenure: 10,
        interestRate: 4,
        schedules: 1519.98,
        totalInterest: 197.7

      }

    ]
  },
  {
    id: 12,
    name: 'Biden',
    email: ' bidene@example.com',
    repayments: [
      {
        repaymentID: 321,
        loanType: 'car',
        loanAmount: 20000,
        interestRate: 10,
        tenure: 14,
        schedules: 1787.61,
        totalInterest: 2224.45


      }
    ]
  },
  {
    id: 13,
    name: 'Jaden Smith',
    email: 'willSmith@example.com',
    repayments: [
      {
        repaymentID: 321,
        loanType: 'bike',
        loanAmount: 20000,
        interestRate: 10,
        tenure: 14,
        schedules: 1787.61,
        totalInterest: 2224.45


      }
    ]
  }
];

Customer.insertMany(customers)
  .then(() => {
    console.log('Customers added to the database');
  })
  .catch((error) => {
    console.error('Error adding customers to the database:', error);
  });

// API endpoint to get the list of customers

router.get('/customers', authenticateToken, async (req, res) => {


  return res.status(200).json(customers);
});


router.post('/customers/:customerId/repayment', authenticateToken, async (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const repaymentData = req.body;
  const customer = customers.find((cust) => cust.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  repaymentData.repaymentID = Math.floor(Math.random() * 999);
  delete repaymentData["CustomerID"]
  annualInterestRate = parseInt(repaymentData.loanInterestRate)
  loanAmount = parseInt(repaymentData.loanAmount)
  loanTermsInMonths = parseInt(repaymentData.tenure)
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const denominator = 1 - Math.pow(1 + monthlyInterestRate, -loanTermsInMonths);

  const monthlyPayment = (monthlyInterestRate * loanAmount) / denominator;

  const totalPayment = monthlyPayment * loanTermsInMonths;
  const totalInterest = totalPayment - loanAmount;
  repaymentData.schedules = monthlyPayment.toFixed(2)
  repaymentData.totalInterest = totalInterest.toFixed(2)

  customer.repayments = [...customer.repayments, repaymentData];



  return res.json({ message: 'Repayment item updated successfully' });
});

router.put('/customers/:customerId/repayment/:repaymentId', async (req, res) => {

  const customerId = parseInt(req.params.customerId);
  const repaymentId = parseInt(req.params.repaymentId);
  const updatedRepaymentData = req.body;
  console.log(customerId, repaymentId, req.body)
  const customer = customers.find((cust) => cust.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }


  let repaymentArr = customer.repayments.filter(
    (rep) => rep.repaymentID !== repaymentId
  );




  // function calculateLoanDetails(loanAmount, annualInterestRate, s) {
  annualInterestRate = parseInt(updatedRepaymentData.interestRate)
  loanAmount = parseInt(updatedRepaymentData.loanAmount)
  loanTermsInMonths = parseInt(updatedRepaymentData.tenure)
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const denominator = 1 - Math.pow(1 + monthlyInterestRate, -loanTermsInMonths);

  const monthlyPayment = (monthlyInterestRate * loanAmount) / denominator;

  const totalPayment = monthlyPayment * loanTermsInMonths;
  const totalInterest = totalPayment - loanAmount;
  updatedRepaymentData.schedules = monthlyPayment.toFixed(2)
  updatedRepaymentData.totalInterest = totalInterest.toFixed(2)

  customer.repayments = [...repaymentArr, updatedRepaymentData];


  return res.json({ message: 'Repayment item updated successfully' });
});

router.delete('/customers/:customerId/repayment/:repaymentId', authenticateToken, async (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const repaymentId = parseInt(req.params.repaymentId);

  const customer = customers.find((cust) => cust.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const repaymentArr = customer.repayments.filter(
    (rep) => rep.repaymentID !== repaymentId
  );
  customer.repayments = repaymentArr;


  return res.json({ message: 'Repayment item updated successfully' });
});

module.exports = router;
