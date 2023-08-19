import React, { useState } from 'react'
import { Modal, TextField, Button, } from "@mui/material";

const CreateNewLoan = ({ createModalOpen, setCreateModalOpen, customerID, token, fetchCustomers }) => {
    console.log("customerID:", customerID)
    const [formData, setFormData] = useState({
        CustomerID: customerID,

        loanInterestRate: '',
        tenure: '',
        loanType: '',
        loanAmount: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:6969/api/customers/${customerID}/repayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then(() => {

                fetchCustomers()
                setCreateModalOpen(false)
            })
            .catch((error) => console.error('Error updating loan:', error));


        console.log('Form Data:', formData);

    };
    return (
        <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
            <div className="edit-modal">
                <form onSubmit={handleSubmit}>
                    <h2>Create Loans</h2>

                    <TextField
                        sx={{ paddingBlock: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                        label="Interest Rate"
                        name='loanInterestRate'
                        onChange={handleChange}
                        fullWidth
                        placeholder="interest per year"
                    />
                    <TextField
                        sx={{ paddingBlock: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Loan Term "
                        name="tenure"
                        onChange={handleChange}
                        fullWidth
                        placeholder="in months"
                    />
                    <TextField
                        sx={{ paddingBlock: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Loan Type"
                        name="loanType"
                        placeholder="personal/home etc.."
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField

                        sx={{ paddingBlock: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Loan Amount"
                        name="loanAmount"
                        placeholder="personal/home etc.."
                        onChange={handleChange} fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </form>
            </div>
        </Modal >
    )
}

export default CreateNewLoan