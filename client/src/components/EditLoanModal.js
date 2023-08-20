import { Modal, TextField, Button, Grid } from "@mui/material";
import React, { useState } from "react";

const EditLoanModal = ({
  editModalOpen,
  handleCloseEditModal,
  customerID,
  repaymentID,
  token,
  fetchCustomers,
  setEditModalOpen,
}) => {
  const [editLoanData, setEditLoanData] = useState({
    customerID: customerID,
    loanId: repaymentID,
    loanType: "",
    loanAmount: "",
    loanInterestRate: "",
    tenure: "",
  });

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditLoanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `http://localhost:6969/api/customers/${customerID}/repayment/${repaymentID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editLoanData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchCustomers();
        setEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating loan:", error));
  };

  return (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <div className="edit-modal">
        <h2>Edit Loan Details</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="start Date"
            name="startDate"
            type="date"
            onChange={handleEditChange}
            fullWidth
            placeholder="interest per year in numbers(5,8,12)"
          />
          <TextField
            required
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Interest Rate"
            name="loanInterestRate"
            onChange={handleEditChange}
            fullWidth
            placeholder="interest per year in numbers(5,8,12)"
          />
          <TextField
            required
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
            label="Loan Term "
            name="tenure"
            fullWidth
            placeholder="in months in number(6,12,36)"
            onChange={handleEditChange}
          />
          <TextField
            required
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Loan Type"
            name="loanType"
            placeholder="personal/home etc.."
            fullWidth
            onChange={handleEditChange}
          />
          <TextField
            required
            type="text"
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Loan Amount"
            name="loanAmount"
            placeholder="amount"
            fullWidth
            onChange={handleEditChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditLoanModal;
