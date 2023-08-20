import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddBoxIcon from "@mui/icons-material/AddBox";

import CreateNewLoan from "./CreateNewLoan";
import EachLoan from "./EachLoan";

const CustomerRow = ({ token, each, fetchCustomers }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <>
            <TableRow
                key={each.id}
                sx={{ width: "100%", "&:hover": { background: "lightgrey" }, }}
                onClick={() => {
                    setIsCollapsed(!isCollapsed);
                }}
            >
                <TableCell align="left">{each.name}</TableCell>
                <TableCell align="center">{each.email}</TableCell>
                <TableCell align="center">{each.id}</TableCell>
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
                <TableCell
                    sx={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 500 }}
                >
                    <IconButton
                        onClick={() => setCreateModalOpen(true)}
                        title="Add New Loan Repayment Schedule for this particular customer"
                    >
                        <AddBoxIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <CreateNewLoan
                fetchCustomers={fetchCustomers}
                token={token}
                createModalOpen={createModalOpen}
                setCreateModalOpen={setCreateModalOpen}
                customerID={each.id}
            />

            <TableRow>
                <TableCell colSpan={5}>
                    <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                        {each?.repayments?.map((eachLoan) => {
                            return (
                                <>
                                    <EachLoan
                                        customerID={each?.id}
                                        eachLoan={eachLoan}
                                        token={token}
                                        fetchCustomers={fetchCustomers}
                                    />
                                </>
                            );
                        })}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CustomerRow;
