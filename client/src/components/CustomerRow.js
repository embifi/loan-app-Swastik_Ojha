import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLoanModal from "./EditLoanModal";
import CreateNewLoan from "./CreateNewLoan";

const CustomerRow = ({ token, each, fetchCustomers }) => {
    console.log("each:", each)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        // setEditLoanData({});
    };
    const handleDeleteLoan = (customerID, repaymentID) => {
        fetch(`http://localhost:6969/api/customers/${customerID}/repayment/${repaymentID}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(() => {


                fetchCustomers()
            })
            .catch((error) => console.error('Error deleting loan:', error));
    };
    const updatedRepaymentData = (customerId, repaymentID) => {


        fetch(`http://localhost:6969/api/customers/${customerId}/repayments/${repaymentID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                loanType: 'private jet' // The new loan type you want to set
            }),
        })
            .then((response) => response.json())
            .then(() => {

                fetchCustomers()
            })
            .catch((error) => console.error('Error updating loan:', error));

    }


    return (
        <>
            <TableRow

                key={each.id}
                sx={{ width: "100%", "&:hover": { background: "lightgrey" } }}
                onClick={() => {


                    setIsCollapsed(!isCollapsed);
                }}
            >
                <TableCell align="left">{each.name}</TableCell>
                <TableCell align="center">{each.email}</TableCell>
                <TableCell align="center">{each._id}</TableCell>
                <TableCell align="right">
                    <IconButton
                        sx={{
                            color: "font.light",
                        }}
                        size="small"
                        onClick={() => {
                            setIsCollapsed(!isCollapsed);
                        }}
                    >
                        {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}>
                    <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                        <Box border={"1px solid"} borderColor="primary.main">
                            <Table stickyHeader size="small" aria-label="collapse">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>REPAYMENT ID</TableCell>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>Loan Type</TableCell>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }} >Loan Amount</TableCell>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>Repayment Schedule(to be paid per month)</TableCell>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>interest Rate</TableCell>

                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>Total Interest</TableCell>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>LoanTerm(months)</TableCell>
                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>Actions</TableCell>

                                        <TableCell sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500, }}>
                                            <IconButton onClick={() => setCreateModalOpen(true)} title="Add New Loan Repayment Schedule for this particular customer" >
                                                <AddBoxIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <CreateNewLoan fetchCustomers={fetchCustomers} token={token} createModalOpen={createModalOpen} setCreateModalOpen={setCreateModalOpen} customerID={each.id} />
                                </TableHead>
                                <TableBody>
                                    {each?.repayments?.map((eachRepayment) => {

                                        return (<>
                                            <TableRow key={eachRepayment?.repaymentID} sx={{ "&:hover": { background: "lightgrey" } }}>
                                                <TableCell>{eachRepayment?.repaymentID}</TableCell>
                                                <TableCell>{eachRepayment.loanType}</TableCell>
                                                <TableCell>₹{eachRepayment.loanAmount}</TableCell>
                                                <TableCell align="center">₹{eachRepayment.schedules ?? "calc"}</TableCell>
                                                <TableCell>₹{eachRepayment?.interestRate}</TableCell>

                                                <TableCell>₹{eachRepayment?.totalInterest}</TableCell>
                                                <TableCell align="center">{eachRepayment?.loanTerm}</TableCell>

                                                <TableCell>
                                                    <IconButton title="Delete">
                                                        <DeleteIcon onClick={() => handleDeleteLoan(each.id, eachRepayment.repaymentID)} />
                                                    </IconButton>
                                                    <IconButton onClick={() => setEditModalOpen(true)}>

                                                        {/* // updatedRepaymentData(each.id, eachRepayment?.repaymentID)}> */}
                                                        <EditIcon />
                                                    </IconButton>{" "}
                                                </TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <EditLoanModal key={eachRepayment.repaymentID}
                                                customerID={each.id} repaymentID={eachRepayment?.repaymentID}
                                                editModalOpen={editModalOpen}

                                                handleCloseEditModal={handleCloseEditModal}
                                                setEditModalOpen={setEditModalOpen}
                                                editLoanData={eachRepayment}
                                                toekn={token}
                                                fetchCustomers={fetchCustomers}
                                            />
                                        </>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CustomerRow;
