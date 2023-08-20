import React, { useState } from "react";
import {
    Box,
    Grid,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLoanModal from "./EditLoanModal";
import { EachMothRow } from "./EachMothRow";
const EachLoan = ({ eachLoan, token, fetchCustomers, customerID }) => {
    const handleDeleteLoan = (customerID, loanId) => {
        fetch(
            `http://localhost:6969/api/customers/${customerID}/repayment/${loanId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then(() => {
                fetchCustomers();
            })
            .catch((error) => console.error("Error deleting loan:", error));
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleCloseEditModal = (e) => {
        e.preventDefault();
        setEditModalOpen(false);
    };

    return (
        <Grid key={eachLoan?.loanId}>
            <Box border={"1px solid"} borderColor="primary.main">
                <Grid display={"flex"} justifyContent={"space-between"}>
                    {" "}
                    <Typography>loanType:{eachLoan.loanType}</Typography>{" "}
                    <Typography>loanAmount:₹{eachLoan.loanAmount}</Typography>
                    <Typography>loanInterestRate:{eachLoan.loanInterestRate}%</Typography>
                    <Typography>tenure in months:{eachLoan?.tenure}</Typography>
                    <Typography>start month:{eachLoan?.startDate}</Typography>

                    <Grid> <IconButton title="Delete">
                        <DeleteIcon
                            onClick={() => {
                                handleDeleteLoan(customerID, eachLoan?.loanId);
                            }}
                        />
                    </IconButton>
                        <IconButton
                            onClick={() => {
                                setEditModalOpen(true);
                            }}
                        >
                            <EditIcon />
                        </IconButton>{" "}
                    </Grid>
                </Grid>
                <Table stickyHeader size="small" aria-label="collapse">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                            >
                                month
                            </TableCell>
                            <TableCell
                                sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                            >
                                payment
                            </TableCell>
                            <TableCell
                                sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                            >
                                principal
                            </TableCell>
                            <TableCell
                                sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                            >
                                interest
                            </TableCell>
                            <TableCell
                                sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                            >
                                remainingBalance
                            </TableCell>

                            <TableCell
                                sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                            >
                                Total paid
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eachLoan?.schedules?.map((eachSchedule) => {
                            return <EachMothRow eachSchedule={eachSchedule} />;
                        })}
                    </TableBody>
                </Table>
            </Box>
            <EditLoanModal
                customerID={customerID}
                repaymentID={eachLoan?.loanId}
                editModalOpen={editModalOpen}
                handleCloseEditModal={handleCloseEditModal}
                setEditModalOpen={setEditModalOpen}
                // editLoanData={eachSchedule}
                toekn={token}
                fetchCustomers={fetchCustomers}
            />
        </Grid>
    );
};

export default EachLoan;
