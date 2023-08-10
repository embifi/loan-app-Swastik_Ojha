import { Modal, TextField, Button } from "@mui/material";
import React from "react";

const EditLoanModal = ({
  editModalOpen,
  handleCloseEditModal,
  handleEditSubmit,
  handleEditChange,
  editLoanData,
}) => {
  return (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <div className="edit-modal">
        <h2>Edit Loan Details</h2>
        <form onSubmit={handleEditSubmit}>
          <TextField
            label="Loan Amount"
            value={editLoanData.loanAmount}
            onChange={(e) => handleEditChange("loanAmount", e.target.value)}
            fullWidth
          />
          <TextField
            label="Interest Rate"
            value={editLoanData.interestRate}
            onChange={(e) => handleEditChange("interestRate", e.target.value)}
            fullWidth
          />
          <TextField
            label="Loan Term"
            value={editLoanData.loanTerm}
            onChange={(e) => handleEditChange("loanTerm", e.target.value)}
            fullWidth
          />
          <TextField
            label="Loan Type"
            value={editLoanData.loanType}
            onChange={(e) => handleEditChange("loanType", e.target.value)}
            fullWidth
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
