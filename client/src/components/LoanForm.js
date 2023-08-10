// client/src/components/LoanForm.js
import React, { useState } from 'react';

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
        <div>
            <h2>Add New Loan</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="loanAmount">Loan Amount:</label>
                    <input
                        type="number"
                        id="loanAmount"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="interestRate">Interest Rate:</label>
                    <input
                        type="number"
                        id="interestRate"
                        name="interestRate"
                        value={formData.interestRate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="loanTerm">Loan Term (months):</label>
                    <input
                        type="number"
                        id="loanTerm"
                        name="loanTerm"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="loanType">Loan Type:</label>
                    <input
                        type="text"
                        id="loanType"
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoanForm;
