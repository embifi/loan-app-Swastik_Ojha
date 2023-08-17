// client/src/components/LoanTypeList.js
import { TableCell, TableContainer, TableHead, TableBody, TableRow, Table, Button, IconButton, Grid, Dialog, Modal, Box, Collapse, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';



import CustomerRow from './CustomerRow';


const LoanTypeList = ({ token, setLoanTypes, loanTypes }) => {
    const [customer, setCustomer] = useState([]);


    // const handleOpenEditModal = (loan) => {
    //     setEditLoanData(loan);
    //     setEditModalOpen(true);
    // };
    // const handleCloseEditModal = () => {
    //     // setEditModalOpen(false);
    //     setEditLoanData({});
    // };
    // const handleEditChange = (field, value) => {
    //     setEditLoanData((prevData) => ({
    //         ...prevData,
    //         [field]: value,
    //     }));
    // };

    // const handleEditSubmit = (e) => {
    //     e.preventDefault();

    //     fetch(`http://localhost:6969/api/loans/${editLoanData.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(editLoanData),
    //     })
    //         .then((response) => response.json())
    //         .then((updatedLoan) => {

    //             setLoanTypes((prevLoanTypes) =>
    //                 prevLoanTypes.map((loan) =>
    //                     loan.id === updatedLoan.id ? updatedLoan : loan
    //                 )
    //             );
    //             handleCloseEditModal();
    //         })
    //         .catch((error) => console.error('Error updating loan:', error));
    // };




    console.log('Initial loanTypes:', loanTypes);

    const fetchLoanTypes = () => {
        fetch('http://localhost:6969/api/loans', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => { setLoanTypes(data) })
            .catch((error) => console.error('Error fetching loans:', error));
    };

    const fetchCustomers = () => {
        fetch('http://localhost:6969/api/customers', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("dataaaaaaaa", data?.customers)
                setCustomer(data?.customers)
            })
            .catch((error) => console.error('Error fetching loans:', error));
    };

    useEffect(() => {
        fetchLoanTypes();
        fetchCustomers()
    }, [])

    // const handleDeleteLoan = (loanId) => {
    //     fetch(`http://localhost:6969/api/loans/${loanId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Loan deleted:', data);

    //             fetchLoanTypes();
    //         })
    //         .catch((error) => console.error('Error deleting loan:', error));
    // };



    return (

        // <TableContainer>
        //     <Table
        //         stickyHeader
        //         padding="10%"

        //         sx={{
        //             borderSpacing: 0,
        //             borderCollapse: 0,
        //         }}>
        //         <TableHead >
        //             <TableRow sx={{ height: "20px", }}>
        //                 <TableCell>Name of Customer/Buisness</TableCell>
        //                 <TableCell>Repayment Schedule</TableCell>
        //                 <TableCell>Loan Type</TableCell>
        //                 <TableCell>Repayment Amount</TableCell>


        //                 <TableCell sx={{ width: "10%" }}>
        //                     actions                        </TableCell> <TableCell>Interest calculation</TableCell><TableCell>Due Date</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {loanTypes ? loanTypes?.map?.((each) => {
        //                 return (
        //                     <TableRow key={each.id}>
        //                         <TableCell>{each.loanType}</TableCell>
        //                         <TableCell>{each.loanAmount} </TableCell>
        //                         <TableCell>{each.interestRate} </TableCell>
        //                         <TableCell>{each.loanTerm} </TableCell>


        //                         <TableCell>
        //                             <IconButton title='Delete' onClick={() => handleDeleteLoan(each.id)}><DeleteIcon /></IconButton>
        //                             <IconButton onClick={() => handleOpenEditModal(each)}>
        //                                 <EditIcon />
        //                             </IconButton>                                </TableCell>
        //                         <TableCell>Interest calculation</TableCell>
        //                         <TableCell>Due Date</TableCell>  </TableRow>
        //                 )
        //             })
        //                 : null}
        //         </TableBody>
        //         <EditLoanModal
        //             editModalOpen={editModalOpen}
        //             handleEditSubmit={handleEditSubmit}
        //             handleCloseEditModal={handleCloseEditModal}
        //             handleEditChange={handleEditChange}
        //             editLoanData={editLoanData}
        //         />


        //     </Table>
        // </TableContainer >

        // <ul>
        //     {customer?.map?.((each) => {
        //         return <li key={each.id} onClick={() => {

        //             fetch(`http://localhost:6969/api/customers/2/repayment`, {
        //                 method: 'GET',
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             })
        //                 .then((response) => response.json())
        //                 .then((data) => {
        //                     console.log('Loan deleted:', data);

        //                     fetchLoanTypes();
        //                     setEditRepaymentModalOpen(true)
        //                 })
        //                 .catch((error) => console.error('Error deleting loan:', error));


        //         }} >{each.name}</li>
        //     })}
        //     <Modal open={editRepaymentModalOpen}/>
        // </ul>
        <TableContainer>
            <Table
                stickyHeader
                padding="10%"

                sx={{
                    borderSpacing: 0,
                    borderCollapse: 0,
                }}>
                <TableHead >
                    <TableRow sx={{ height: "20px", }}>
                        <TableCell align='left' sx={{ width: "45%" }}>Customer/Buismess Name</TableCell>
                        <TableCell align='center' sx={{ width: "45%" }}>ID</TableCell>
                        <TableCell align='left' sx={{ width: "20%" }} >

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customer?.map?.((each) => {
                            return (

                                <CustomerRow token={token} each={each} />

                            )

                        })
                    }
                </TableBody>


            </Table></TableContainer>
    );
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
  

