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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLoanModal from "./EditLoanModal";

const CustomerRow = ({ token, each }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        // setEditLoanData({});
    };

    const rps = {
        repaymentSchedule: [
            {
                paymentDueDate: "2023-08-17T13:24:23.250Z",
                paymentAmount: 2000,
            },
            {
                paymentDueDate: "2023-08-17T13:24:23.250Z",
                paymentAmount: 1000,
            },
            {
                paymentDueDate: "2023-08-17T13:24:23.250Z",
                paymentAmount: 2000,
            },
            {
                paymentDueDate: "2023-08-17T13:24:23.250Z",
                paymentAmount: 2000,
            },
            {
                paymentDueDate: "2023-08-17T13:24:23.250Z",
                paymentAmount: 2000,
            },
        ],
    };
    return (
        <>
            <TableRow
                key={each.id}
                sx={{ width: "100%" }}
                onClick={() => {
                    fetch(`http://localhost:6969/api/customers/${each.id}/repayment`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Loan deleted:", data);

                            // setrps(data?.repaymentSchedule);
                            // setEditRepaymentModalOpen(true);
                        })
                        .catch((error) => console.error("Error deleting loan:", error));
                    setIsCollapsed(!isCollapsed);
                }}
            >
                <TableCell align="left">{each.name}</TableCell>
                <TableCell align="center">{each.id}</TableCell>
                <TableCell>
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
                <TableCell colSpan={3}>
                    <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                        <Box border={"1px solid"} borderColor="primary.main">
                            <Table stickyHeader size="small" aria-label="collapse">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Loan Type</TableCell>
                                        <TableCell>Loan Amount</TableCell>
                                        <TableCell>Repayment Schedule</TableCell>
                                        <TableCell>interest Rate</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Total Interest</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rps?.repaymentSchedule?.map((each) => {
                                        return (
                                            <TableRow key={Math.random()}>
                                                <TableCell>loanType</TableCell>
                                                <TableCell>amount.INR</TableCell>
                                                <TableCell>SCHEDULE</TableCell>
                                                <TableCell>interest</TableCell>
                                                <TableCell>Start Date</TableCell>
                                                <TableCell>dueDate</TableCell>
                                                <TableCell>Total Interest</TableCell>
                                                <TableCell>
                                                    <IconButton title="Delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => setEditModalOpen(true)}>
                                                        <EditIcon />
                                                    </IconButton>{" "}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <EditLoanModal
                                    editModalOpen={editModalOpen}
                                    //   handleEditSubmit={handleEditSubmit}
                                    handleCloseEditModal={handleCloseEditModal}
                                //   handleEditChange={handleEditChange}
                                //   editLoanData={editLoanData}
                                />
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CustomerRow;
