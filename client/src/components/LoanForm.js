// client/src/components/LoanForm.js
import React, { useState } from 'react';
import { TableCell, TableContainer, TableHead, TableBody, TableRow, Table, Button, IconButton, Grid, Dialog } from '@mui/material';


const LoanForm = ({ token, setLoanTypes }) => {
    const initialFormState = {
        loanAmount: '',
        interestRate: '',
        loanTerm: '',
        loanType: '',
    };
    const fetchLoans = () => {
        fetch('http://localhost:6969/api/loans', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched loans:', data);
                setLoanTypes(data);

            })
            .catch((error) => console.error('Error fetching loans:', error));
    };


    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:6969/api/loans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('New loan added:', data);
                setFormData(initialFormState);
                fetchLoans();
            })
            .catch((error) => console.error('Error adding loan:', error));
    };



    return (
        <Grid sx={{ border: "1px light solid" }}>

            <form onSubmit={handleSubmit}>
                <h3>Add New Loan</h3>
                <TableContainer>
                    <Table stickyHeader
                        padding="10%"

                        sx={{
                            borderSpacing: 0,
                            borderCollapse: 0,
                        }}>
                        <TableHead >
                            <TableRow sx={{ height: "20px" }}>
                                <TableCell>Loan Term</TableCell>
                                <TableCell>Loan Amount</TableCell>
                                <TableCell>interest Rate</TableCell>
                                <TableCell>Loan Type</TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ width: "10%" }}>
                                    actions                        </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody >
                            <TableRow>

                                <TableCell>

                                    <input
                                        type="number"
                                        id="loanTerm"
                                        name="loanTerm"
                                        value={formData.loanTerm}
                                        onChange={handleChange}
                                        required
                                    />

                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        id="loanAmount"
                                        name="loanAmount"
                                        value={formData.loanAmount}
                                        onChange={handleChange}
                                        required
                                    />




                                </TableCell>
                                <TableCell>

                                    <input
                                        type="number"
                                        id="interestRate"
                                        name="interestRate"
                                        value={formData.interestRate}
                                        onChange={handleChange}
                                        required
                                    />

                                </TableCell>
                                <TableCell><input
                                    type="text"
                                    id="loanType"
                                    name="loanType"
                                    value={formData.loanType}
                                    onChange={handleChange}
                                    required
                                /></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ width: "10%" }}>
                                    <button type="submit">Submit</button>                     </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Grid>
    );
};

export default LoanForm;
