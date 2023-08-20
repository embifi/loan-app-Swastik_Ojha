// server/routes/loans.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../authMiddleware");
const mongoose = require("mongoose");
const Customer = require("../models/customer");

// list of customers
//  will act as database
const customers = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    repayments: [
      {
        startDate: "Jan 2023",
        loanId: 435,
        loanType: "Seed Round Raise",
        loanAmount: "8000000",
        loanInterestRate: "15",
        tenure: "12",
        schedules: [
          {
            month: "Jan 2023",
            payment: "722066.50",
            principal: "622066.50",
            interest: "100000.00",
            remainingBalance: "7377933.50",
            totalPaid: "722066.50",
          },
          {
            month: "Feb 2023",
            payment: "722066.50",
            principal: "629842.33",
            interest: "92224.17",
            remainingBalance: "6748091.17",
            totalPaid: "1444133.00",
          },
          {
            month: "Mar 2023",
            payment: "722066.50",
            principal: "637715.36",
            interest: "84351.14",
            remainingBalance: "6110375.81",
            totalPaid: "2166199.50",
          },
          {
            month: "Apr 2023",
            payment: "722066.50",
            principal: "645686.80",
            interest: "76379.70",
            remainingBalance: "5464689.01",
            totalPaid: "2888266.00",
          },
          {
            month: "May 2023",
            payment: "722066.50",
            principal: "653757.89",
            interest: "68308.61",
            remainingBalance: "4810931.12",
            totalPaid: "3610332.49",
          },
          {
            month: "Jun 2023",
            payment: "722066.50",
            principal: "661929.86",
            interest: "60136.64",
            remainingBalance: "4149001.27",
            totalPaid: "4332398.99",
          },
          {
            month: "Jul 2023",
            payment: "722066.50",
            principal: "670203.98",
            interest: "51862.52",
            remainingBalance: "3478797.28",
            totalPaid: "5054465.49",
          },
          {
            month: "Aug 2023",
            payment: "722066.50",
            principal: "678581.53",
            interest: "43484.97",
            remainingBalance: "2800215.75",
            totalPaid: "5776531.99",
          },
          {
            month: "Sep 2023",
            payment: "722066.50",
            principal: "687063.80",
            interest: "35002.70",
            remainingBalance: "2113151.95",
            totalPaid: "6498598.49",
          },
          {
            month: "Oct 2023",
            payment: "722066.50",
            principal: "695652.10",
            interest: "26414.40",
            remainingBalance: "1417499.85",
            totalPaid: "7220664.99",
          },
          {
            month: "Nov 2023",
            payment: "722066.50",
            principal: "704347.75",
            interest: "17718.75",
            remainingBalance: "713152.10",
            totalPaid: "7942731.49",
          },
          {
            month: "Dec 2023",
            payment: "722066.50",
            principal: "713152.10",
            interest: "8914.40",
            remainingBalance: "-0.00",
            totalPaid: "8664797.99",
          },
        ],
      },
      {
        startDate: "Oct 2023",
        loanId: 441,
        loanType: "Amsterdam Trip",
        loanAmount: "500000",
        loanInterestRate: "12",
        tenure: "8",
        schedules: [
          {
            month: "Oct 2023",
            payment: "65345.15",
            principal: "60345.15",
            interest: "5000.00",
            remainingBalance: "439654.85",
            totalPaid: "65345.15",
          },
          {
            month: "Nov 2023",
            payment: "65345.15",
            principal: "60948.60",
            interest: "4396.55",
            remainingBalance: "378706.26",
            totalPaid: "130690.29",
          },
          {
            month: "Dec 2023",
            payment: "65345.15",
            principal: "61558.08",
            interest: "3787.06",
            remainingBalance: "317148.17",
            totalPaid: "196035.44",
          },
          {
            month: "Jan 2024",
            payment: "65345.15",
            principal: "62173.66",
            interest: "3171.48",
            remainingBalance: "254974.51",
            totalPaid: "261380.58",
          },
          {
            month: "Feb 2024",
            payment: "65345.15",
            principal: "62795.40",
            interest: "2549.75",
            remainingBalance: "192179.11",
            totalPaid: "326725.73",
          },
          {
            month: "Mar 2024",
            payment: "65345.15",
            principal: "63423.35",
            interest: "1921.79",
            remainingBalance: "128755.75",
            totalPaid: "392070.88",
          },
          {
            month: "Apr 2024",
            payment: "65345.15",
            principal: "64057.59",
            interest: "1287.56",
            remainingBalance: "64698.16",
            totalPaid: "457416.02",
          },
          {
            month: "May 2024",
            payment: "65345.15",
            principal: "64698.16",
            interest: "646.98",
            remainingBalance: "0.00",
            totalPaid: "522761.17",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Oliver",
    email: "oliver@example.com",
    repayments: [
      {
        startDate: "Jan 2024",
        loanId: 316,
        loanType: "Car",
        loanAmount: "10000000",
        loanInterestRate: "5",
        tenure: "4",
        schedules: [
          {
            month: "Jan 2024",
            payment: "2526095.81",
            principal: "2484429.14",
            interest: "41666.67",
            remainingBalance: "7515570.86",
            totalPaid: "2526095.81",
          },
          {
            month: "Feb 2024",
            payment: "2526095.81",
            principal: "2494780.93",
            interest: "31314.88",
            remainingBalance: "5020789.93",
            totalPaid: "5052191.61",
          },
          {
            month: "Mar 2024",
            payment: "2526095.81",
            principal: "2505175.85",
            interest: "20919.96",
            remainingBalance: "2515614.08",
            totalPaid: "7578287.42",
          },
          {
            month: "Apr 2024",
            payment: "2526095.81",
            principal: "2515614.08",
            interest: "10481.73",
            remainingBalance: "-0.00",
            totalPaid: "10104383.23",
          },
        ],
      },
      {
        startDate: "Aug 2023",
        loanId: 173,
        loanType: "electronic",
        loanAmount: "600000",
        loanInterestRate: "7",
        tenure: "5",
        schedules: [
          {
            month: "Aug 2023",
            payment: "122108.14",
            principal: "118608.14",
            interest: "3500.00",
            remainingBalance: "481391.86",
            totalPaid: "122108.14",
          },
          {
            month: "Sep 2023",
            payment: "122108.14",
            principal: "119300.02",
            interest: "2808.12",
            remainingBalance: "362091.83",
            totalPaid: "244216.29",
          },
          {
            month: "Oct 2023",
            payment: "122108.14",
            principal: "119995.94",
            interest: "2112.20",
            remainingBalance: "242095.89",
            totalPaid: "366324.43",
          },
          {
            month: "Nov 2023",
            payment: "122108.14",
            principal: "120695.92",
            interest: "1412.23",
            remainingBalance: "121399.98",
            totalPaid: "488432.57",
          },
          {
            month: "Dec 2023",
            payment: "122108.14",
            principal: "121399.98",
            interest: "708.17",
            remainingBalance: "0.00",
            totalPaid: "610540.71",
          },
        ],
      },
    ],
  },
];

Customer.insertMany(customers)
  .then(() => {
    console.log("Customers added to the database");
  })
  .catch((error) => {
    console.error("Error adding customers to the database:", error);
  });

// API endpoint to get the list of customers

router.get("/customers", authenticateToken, async (req, res) => {
  return res.status(200).json(customers);
});

router.post(
  "/customers/:customerId/repayment",
  authenticateToken,
  async (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const repaymentData = req.body;
    const customer = customers.find((cust) => cust.id === customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const startDate = repaymentData.startDate;
    const tenureMonths = parseInt(repaymentData.tenure);
    const loanAmount = parseInt(repaymentData.loanAmount);
    const interestRate = parseInt(repaymentData.loanInterestRate);

    function generateAmortizationSchedule(
      startDate,
      tenureMonths,
      loanAmount,
      interestRate
    ) {
      const monthlyInterestRate = interestRate / 100 / 12;
      const monthlyPayment =
        loanAmount *
        (monthlyInterestRate /
          (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths)));
      let remainingBalance = loanAmount;
      const schedule = [];

      for (let month = 1; month <= tenureMonths; month++) {
        const interestPayment = remainingBalance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        const formattedDate = new Date(startDate);
        formattedDate.setMonth(formattedDate.getMonth() + month - 1);

        const monthDetails = {
          month: formattedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          }),
          payment: monthlyPayment.toFixed(2),
          principal: principalPayment.toFixed(2),
          interest: interestPayment.toFixed(2),
          remainingBalance: remainingBalance.toFixed(2),
          totalPaid: (month * monthlyPayment).toFixed(2),
        };

        schedule.push(monthDetails);
      }
      const newLoan = {
        startDate: new Date(startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
        loanId: parseInt(Math.random() * 999),
        loanType: repaymentData.loanType,
        loanAmount: repaymentData.loanAmount,
        loanInterestRate: repaymentData.loanInterestRate,
        tenure: repaymentData.tenure,
        schedules: [...schedule],
      };

      return newLoan;
    }

    const amortizationSchedule = generateAmortizationSchedule(
      startDate,
      tenureMonths,
      loanAmount,
      interestRate
    );

    customer.repayments.push(amortizationSchedule);

    return res.json({ message: "Repayment item updated successfully" });
  }
);

router.put("/customers/:customerId/repayment/:loanId", async (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const loanId = parseInt(req.params.loanId);
  console.log(loanId);
  const updatedRepaymentData = req.body;

  const customer = customers.find((cust) => cust.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  let repaymentArr = customer.repayments.filter((rep) => rep.loanId !== loanId);
  console.log(repaymentArr);
  let startDate = updatedRepaymentData.startDate;
  let tenureMonths = parseInt(updatedRepaymentData.tenure);
  let loanAmount = parseInt(updatedRepaymentData.loanAmount);
  let interestRate = parseInt(updatedRepaymentData.loanInterestRate);

  function generateAmortizationSchedule(
    startDate,
    tenureMonths,
    loanAmount,
    interestRate
  ) {
    const monthlyInterestRate = interestRate / 100 / 12;
    const monthlyPayment =
      loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths)));
    let remainingBalance = loanAmount;
    const schedule = [];

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      const formattedDate = new Date(startDate);
      formattedDate.setMonth(formattedDate.getMonth() + month - 1);

      const monthDetails = {
        month: formattedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
        totalPaid: (month * monthlyPayment).toFixed(2),
      };

      schedule.push(monthDetails);
    }
    const newLoan = {
      startDate: new Date(startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      loanId: updatedRepaymentData?.loanId,
      loanType: updatedRepaymentData.loanType,
      loanAmount: updatedRepaymentData.loanAmount,
      loanInterestRate: updatedRepaymentData.loanInterestRate,
      tenure: updatedRepaymentData.tenure,
      schedules: [...schedule],
    };

    return newLoan;
  }
  const amortizationSchedule = generateAmortizationSchedule(
    startDate,
    tenureMonths,
    loanAmount,
    interestRate
  );
  console.log("amortizationSchedule", amortizationSchedule);
  customer.repayments = [...repaymentArr, amortizationSchedule];

  return res.json({ message: "Repayment item updated successfully" });
});

router.delete(
  "/customers/:customerId/repayment/:loanId",
  authenticateToken,
  async (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const loanId = parseInt(req.params.loanId);

    const customer = customers.find((cust) => cust.id === customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const repaymentArr = customer.repayments.filter(
      (rep) => rep.loanId !== loanId
    );

    customer.repayments = repaymentArr;

    return res.json({ message: "Repayment item updated successfully" });
  }
);

module.exports = router;
