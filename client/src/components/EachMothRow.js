import React from 'react'
import {

    TableCell,

    TableRow,

} from "@mui/material";
export const EachMothRow = ({ eachSchedule }) => {
    return (
        <>
            <TableRow key={Math.random() * 999} sx={{ "&:hover": { background: "lightgrey" } }}>
                <TableCell>{eachSchedule?.month}</TableCell>
                <TableCell>{eachSchedule.payment}</TableCell>
                <TableCell>₹{eachSchedule.principal}</TableCell>
                <TableCell align="center">₹{eachSchedule.interest}</TableCell>
                <TableCell>₹{eachSchedule?.remainingBalance}</TableCell>
                <TableCell>₹{eachSchedule?.totalPaid}</TableCell>
                <TableCell>

                </TableCell>
                <TableCell></TableCell>

            </TableRow>
        </>
    )
}
