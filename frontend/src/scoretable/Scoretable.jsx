import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Box } from "@mui/material";
export default function Scoretable({ data }) {
  return (
    data && (
      <Box sx={{ backgroundColor: "#faf8f5" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            paddingTop: "0.5rem",
            textAlign: "center",
          }}
        >
          {data.name}
        </Typography>
        <Table
          aria-label="simple table"
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12);",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Guesses</TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Ratio [%]
              </TableCell>
              <TableCell align="right" sx={{ display: { md: "none" } }}>
                [%]
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.Users.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.guesses}</TableCell>
                <TableCell align="right">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    )
  );
}
