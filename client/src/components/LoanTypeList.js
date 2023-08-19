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
            .then((data) => setCustomer(data))
            .catch((error) => console.error('Error fetching loans:', error));
    };

    useEffect(() => {

        fetchCustomers()
    }, [])




    return (


        <>
            <Typography sx={{ p: 2 }}>WelCome Admin</Typography>
            <TableContainer>
                <Table
                    stickyHeader
                    padding="10%"

                    sx={{
                        border: "1px dashed"
                    }}>
                    <TableHead >
                        <TableRow sx={{ height: "20px", }} >
                            <TableCell align='left' sx={{ width: "35%", fontFamily: "Open Sans", fontSize: 16, fontWeight: 650, }}>
                                Customer/Buismess Name</TableCell>
                            <TableCell align='center' sx={{ width: "35%", fontFamily: "Open Sans", fontSize: 16, fontWeight: 600, }}>Email</TableCell>
                            <TableCell align='center' sx={{ width: "15%", fontFamily: "Open Sans", fontSize: 16, fontWeight: 600, }}>ID</TableCell>
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
        </>);
};

export default LoanTypeList;


