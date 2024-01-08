import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import axios from "axios";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Scoretable() {
  const [scoreData, setScoreData] = useState();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const getScoreData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/scoreboards/1`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setScoreData(response.data.scoreboard);
      } catch (e) {
        console.log(e);
      }
    };
    getScoreData();
  }, []);

  return (
    scoreData && (
      <>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", marginTop: "-10px" }}
        >
          {scoreData.name}
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
          <Table aria-label="simple table" sx={{ backgroundColor: "#faf8f5" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align="right">Guesses</TableCell>
                <TableCell align="right">Ratio [%]</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreData?.Users.map((row, index) => (
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
        </TableContainer>
      </>
    )
  );
}
export default Scoretable;
