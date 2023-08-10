// client/src/components/LoanTypeList.js
import { TableCell, TableContainer, TableHead, TableBody, TableRow, Table, Button, IconButton, Grid, Dialog } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import EditLoanModal from './EditLoanModal';


const LoanTypeList = ({ token, setLoanTypes, loanTypes }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLoanData, setEditLoanData] = useState({});
    const handleOpenEditModal = (loan) => {
        setEditLoanData(loan);
        setEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setEditLoanData({});
    };
    const handleEditChange = (field, value) => {
        setEditLoanData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:6969/api/loans/${editLoanData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editLoanData),
        })
            .then((response) => response.json())
            .then((updatedLoan) => {

                setLoanTypes((prevLoanTypes) =>
                    prevLoanTypes.map((loan) =>
                        loan.id === updatedLoan.id ? updatedLoan : loan
                    )
                );
                handleCloseEditModal();
            })
            .catch((error) => console.error('Error updating loan:', error));
    };




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

    useEffect(() => {
        fetchLoanTypes();
    }, [])

    const handleDeleteLoan = (loanId) => {
        fetch(`http://localhost:6969/api/loans/${loanId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Loan deleted:', data);

                fetchLoanTypes();
            })
            .catch((error) => console.error('Error deleting loan:', error));
    };



    return (

        <TableContainer>
            <Table
                stickyHeader
                padding="10%"

                sx={{
                    borderSpacing: 0,
                    borderCollapse: 0,
                }}>
                <TableHead >
                    <TableRow sx={{ height: "20px" }}>
                        <TableCell>Loan Type</TableCell>
                        <TableCell>Loan Amount</TableCell>
                        <TableCell>interest Rate</TableCell>
                        <TableCell>loan term</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell sx={{ width: "10%" }}>
                            actions                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loanTypes ? loanTypes?.map((each) => {
                        return (
                            <TableRow key={each.id}>
                                <TableCell>{each.loanType}</TableCell>
                                <TableCell>{each.loanAmount} </TableCell>
                                <TableCell>{each.interestRate} </TableCell>
                                <TableCell>{each.loanTerm} </TableCell>
                                <TableCell>{each.id}</TableCell>
                                <TableCell>
                                    <IconButton title='Delete' onClick={() => handleDeleteLoan(each.id)}><DeleteIcon /></IconButton>
                                    <IconButton onClick={() => handleOpenEditModal(each)}>
                                        <EditIcon />
                                    </IconButton>                                </TableCell>
                            </TableRow>
                        )
                    })
                        : null}
                </TableBody>
                <EditLoanModal
                    editModalOpen={editModalOpen}
                    handleEditSubmit={handleEditSubmit}
                    handleCloseEditModal={handleCloseEditModal}
                    handleEditChange={handleEditChange}
                    editLoanData={editLoanData}
                />


            </Table>
        </TableContainer >

    );
};

export default LoanTypeList;
