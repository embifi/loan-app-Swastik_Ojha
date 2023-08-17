import { Modal, TextField, Button, Grid } from "@mui/material";
import React from "react";

const EditLoanModal = ({
  editModalOpen,
  handleCloseEditModal,
  // handleEditSubmit,
  // handleEditChange,
  // editLoanData,
}) => {
  return (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <div className="edit-modal">
        <h2>Edit Loan Details</h2>
        <form onSubmit={undefined}>

          <TextField
            sx={{ paddingBlock: 2 }}
            label="Loan StartDate"
            type="Date"

            InputLabelProps={{
              shrink: true,
            }}
            // value={editLoanData.loanStartDate}
            // onChange={(e) => handleEditChange("loanStartDate", e.target.value)}
            fullWidth
          />
          <TextField
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Interest Rate"
            // value={editLoanData.interestRate}
            // onChange={(e) => handleEditChange("interestRate", e.target.value)}
            fullWidth
            placeholder="interest per year"
          />
          <TextField
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Loan Term "
            // value={editLoanData.loanTerm}
            // onChange={(e) => handleEditChange("loanTerm", e.target.value)}
            fullWidth
            placeholder="in months"
          />
          <TextField
            sx={{ paddingBlock: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Loan Type"

            placeholder="personal/home etc.."
            // value={editLoanData.loanType}
            // onChange={(e) => handleEditChange("loanType", e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </Modal >
  );
};

export default EditLoanModal;
