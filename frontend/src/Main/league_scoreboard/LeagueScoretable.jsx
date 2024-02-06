import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { setOpen } from "../../redux/errorSlice";
import axios from "axios";

const tableContainerStyle = {
  maxWidth: 650,
  padding: "3%",
  backgroundColor: "#EEE7DA",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
};

const tableTitleStyle = {
  fontWeight: "bold",
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
  const teams = game?.Teams;
  const [homeId, awayId] =
    teams?.length > 0 ? teams.map((item) => item.ApiId) : [null, null];
  const dispatch = useDispatch();
  React.useEffect(() => {
    setScoretable();
    try {
      CompetitionApiId
        ? (async () => {
            const table = await axios.get(
              `${process.env.REACT_APP_API_URL}/leaguetable/${CompetitionApiId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                params: {
                  TeamsId: [homeId, awayId],
                },
              }
            );
            const { name, Tables: tables } = table.data.competitionTable;
            setScoretable({ name, tables });
          })()
        : setScoretable();
    } catch (e) {
      dispatch(setOpen(true));
      console.error(e);
    }
  }, [CompetitionApiId, token, dispatch, homeId, awayId]);

  const generateLoadingSkeletons = (rows, cell) => {
    const skeletons = [];
    const generateCells = (rowIndex) => {
      const cells = [];
      for (let i = 0; i < cell; i++) {
        cells.push(
          <TableCell
            key={rowIndex + i + ""}
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
      return cells;
    };

    for (let i = 0; i < rows; i++) {
      skeletons.push(
        <TableRow key={`skeleton-${i}`}>{generateCells(i)}</TableRow>
      );
    }
    return skeletons;
  };

  const generateRows = (row, index) => (
    <TableRow
      key={row.Team.shortName + index}
      sx={
        row.TeamApiId === homeId || row.TeamApiId === awayId
          ? {
              backgroundColor: "#fdfdfd",
              fontWeight: "bold",
              "&:last-child td, &:last-child th": { border: 0 },
            }
          : { "&:last-child td, &:last-child th": { border: 0 } }
      }
    >
      {rowDetails.map((item, index) => {
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
            key={field + index}
            sx={
              row.TeamApiId === homeId || row.TeamApiId === awayId
                ? {
                    backgroundColor: "#fdfdfd",
                    fontWeight: "bold",
                    padding: "0.97%",
                    height: "5%",
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }
                : {
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    padding: "0.8%",
                    height: "5%",
                  }
            }
          >
            {text}
          </TableCell>
        );
      })}
    </TableRow>
  );

  const generateTable = (table, ix) => (
    <div key={`table-${ix}`}>
      {table.group && (
        <Typography
          key={`${table.group}+${ix}`}
          variant="h6"
          gutterBottom
          sx={{
            ...tableTitleStyle,
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          {table.group}
        </Typography>
      )}
      <Table
        aria-label="simple table"
        sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12);" }}
      >
        <TableHead>
          <TableRow key={`top-row-${ix}`}>
            {rowDetails.map((item, index) => {
              return (
                <TableCell
                  key={item.head + index}
                  align="center"
                  sx={{ padding: "1.1%", fontWeight: "bold" }}
                >
                  {item.head}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>{table.TableLogs.map((row) => generateRows(row))}</TableBody>
      </Table>
    </div>
  );

  return (
    <TableContainer component={Paper} sx={tableContainerStyle}>
      <Box sx={{ backgroundColor: "#faf8f5" }}>
        <Typography variant="h5" gutterBottom sx={tableTitleStyle}>
          {!scoretable ? <Skeleton sx={{ width: "60%" }} /> : scoretable?.name}
        </Typography>
        {!scoretable ? (
          <>
            <Typography variant="h5" gutterBottom sx={tableTitleStyle}>
              <Skeleton width="40%" />
            </Typography>
            <Table
              aria-label="simple table"
              sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12);" }}
            >
              <TableBody>{generateLoadingSkeletons(19, 8)}</TableBody>
            </Table>
          </>
        ) : (
          <>
            {scoretable.tables.map((table, index) =>
              generateTable(table, index)
            )}
          </>
        )}
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          width: "100%",
          fontWeight: "100",
          fontSize: "10px",
          marginBottom: "0px",
        }}
      >
        Football data provided by the Football-Data.org API
      </Typography>
    </TableContainer>
  );
}
