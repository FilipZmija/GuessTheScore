import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Skeleton,
  Paper,
} from "@mui/material";
import axios from "axios";

const tableContainerStyle = {
  maxWidth: 650,
  padding: "3%",
  backgroundColor: "#EEE7DA",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
};

const tableTitleStyle = {
  paddingTop: "1.6%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
};
export default function LeagueScoretable() {
  const rowDetails = [
    { head: "", field: "position" },
    { head: "Team", field: "team" },
    { head: "MP", field: "playedGames" },
    { head: "W", field: "won" },
    { head: "D", field: "draw" },
    { head: "L", field: "lost" },
    { head: "G", field: "goals" },
    { head: "PTS", field: "points" },
  ];
  const token = useSelector((state) => state.auth.token);
  const [scoretable, setScoretable] = useState();
  const game = useSelector((state) => state.events.selectedGameInfo);
  const CompetitionApiId = game?.CompetitionApiId;

  React.useEffect(() => {
    CompetitionApiId
      ? (async () => {
          const table = await axios.get(
            `${process.env.REACT_APP_API_URL}/leaguetable/${CompetitionApiId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          const { name, Tables: tables } = table.data.competitionTable;
          setScoretable({ name, tables });
        })()
      : setScoretable();
  }, [CompetitionApiId, token]);

  const generateLoadingSkeletons = (rows, cell) => {
    const skeletons = [];
    const cells = [];
    for (let i = 0; i < cell; i++) {
      cells.push(
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{
            padding: "0.97%",
            height: "5%",
          }}
        >
          <Skeleton />
        </TableCell>
      );
    }
    for (let i = 0; i < rows; i++) {
      skeletons.push(<TableRow key={`skeleton-${i}`}>{cells}</TableRow>);
    }
    return skeletons;
  };

  return (
    <TableContainer component={Paper} sx={tableContainerStyle}>
      <Box sx={{ backgroundColor: "#faf8f5" }}>
        <Typography variant="h5" gutterBottom sx={tableTitleStyle}>
          {!scoretable ? <Skeleton sx={{ width: "40%" }} /> : scoretable?.name}
        </Typography>
        <Table
          aria-label="simple table"
          sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12);" }}
        >
          <TableHead>
            <TableRow>
              {rowDetails.map((item) => {
                return (
                  <TableCell align="center" sx={{ padding: "1.1%" }}>
                    {item.head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!scoretable
              ? generateLoadingSkeletons(19, 8)
              : scoretable.tables[0].TableLogs.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {rowDetails.map((item) => {
                      const { field } = item;
                      let text = "";
                      if (field === "team") {
                        text = row.Team.shortName;
                      } else if (field === "goals") {
                        text = row.goalsFor + ":" + row.goalsAgainst;
                      } else {
                        text = row[field];
                      }
                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{
                            padding: "0.97%",
                            height: "5%",
                          }}
                        >
                          {text}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
