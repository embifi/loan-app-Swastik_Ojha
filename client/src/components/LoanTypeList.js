// client/src/components/LoanTypeList.js
import { TableCell, TableContainer, TableHead, TableBody, TableRow, Table, Button, IconButton, Grid, Dialog, Modal, Box, Collapse, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';




import CustomerRow from './CustomerRow';


const LoanTypeList = ({ token, setLoanTypes, loanTypes }) => {
    const [customer, setCustomer] = useState([]);





    console.log('Initial loanTypes:', loanTypes);



    const fetchCustomers = () => {
        fetch('http://localhost:6969/api/customers', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) =>    setCustomer(data)  )
            .catch((error) => console.error('Error fetching loans:', error));
    };

    useEffect(() => {
       
        fetchCustomers()
    }, [])

   


    return (

        
        <>
        <Typography sx={{p:2}}>WelCome Admin</Typography>
        <TableContainer>
            <Table
                stickyHeader
                padding="10%"

                sx={{
                   border:"1px dashed"
                }}>
                <TableHead >
                    <TableRow sx={{ height: "20px", }} >
                        <TableCell align='left' sx={{ width: "35%",fontFamily: "Open Sans",	fontSize: 16,fontWeight: 650, }}>
                            Customer/Buismess Name</TableCell>
                            <TableCell align='center' sx={{ width: "35%",fontFamily: "Open Sans",	fontSize: 16,fontWeight: 600, }}>Email</TableCell>
                        <TableCell align='center' sx={{ width: "15%",fontFamily: "Open Sans",	fontSize: 16,fontWeight: 600, }}>ID</TableCell>
                        <TableCell align='right' sx={{ width: "15%" }} >
                        
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customer?.map?.((each) => {
                            return (

                                <CustomerRow token={token} each={each} fetchCustomers={fetchCustomers} />

                            )

                        })
                    }
                </TableBody>


            </Table></TableContainer>
            </> );
};

export default LoanTypeList;


// function calculateRepaymentSchedule(loanAmount, interestRate, months, startDate) {
//     const monthlyInterestRate = interestRate / 12 / 100;
//     const monthlyPayment =
//       (loanAmount * monthlyInterestRate) /
//       (1 - Math.pow(1 + monthlyInterestRate, -months));
  
//     let repaymentSchedule = [];
//     let remainingBalance = loanAmount;
//     let totalInterest = 0;
  
//     for (let month = 1; month <= months; month++) {
//       const interestPayment = remainingBalance * monthlyInterestRate;
//       const principalPayment = monthlyPayment - interestPayment;
//       totalInterest += interestPayment;
//       remainingBalance -= principalPayment;
  
//       // Calculate payment due date based on start date and tenure
//       const paymentDueDate = new Date(startDate.getTime());
//       paymentDueDate.setMonth(paymentDueDate.getMonth() + month - 1);
  
//       // Create a payment object with details for this month
//       const payment = {
//         month: month,
//         paymentDueDate: paymentDueDate,
//         paymentAmount: monthlyPayment,
//         principalPayment: principalPayment,
//         interestPayment: interestPayment,
//         remainingBalance: remainingBalance,
//       };
  
//       repaymentSchedule.push(payment);
//     }
  
//     return {
//       repaymentSchedule: repaymentSchedule,
//       totalInterestPaid: totalInterest,
//     };
//   }
  
//   // Example usage
//   const loanAmount = 100000;
//   const interestRate = 5;
//   const loanTermMonths = 36;
//   const startDate = new Date(); // Example start date
  
//   const result = calculateRepaymentSchedule(
//     loanAmount,
//     interestRate,
//     loanTermMonths,
//     startDate
//   );
  
//   console.log(result.repaymentSchedule);
//   console.log("Total Interest Paid:", result.totalInterestPaid);
  

