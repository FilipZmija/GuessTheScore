import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow } from "@mui/material/";
import { setSelectedUserId } from "../../redux/scoreboardSlice";

const activeUserRowStyle = {
  fontWeight: "bold",
  position: "sticky",
  borderTop: "1px solid",
  bottom: 0,
  top: 0,
  zIndex: 800,
  backgroundColor: "#fdfdfd",
};

export default function ScoretableRow({ row, username }) {
  const { selectedUserId } = useSelector((state) => state.scoreboard);
  const selectedGame = useSelector((state) => state.guess.selectedGame);
  const dispatch = useDispatch();

  return (
    <TableRow
      onClick={() =>
        selectedGame?.status !== "TIMED" &&
        dispatch(setSelectedUserId(row.User.id))
      }
      selected={
        selectedGame?.status !== "TIMED" && selectedUserId === row.User.id
      }
      hover={selectedGame?.status !== "TIMED"}
      key={row.User.username}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&.Mui-selected": {
          backgroundColor: "rgb(147 173 151 / 15%)",
        },
      }}
    >
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={row.User.username === username ? activeUserRowStyle : {}}
      >
        {row.position}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={row.User.username === username ? activeUserRowStyle : {}}
      >
        {row.User.username}
      </TableCell>
      <TableCell
        align="right"
        sx={
          row.User.username === username
            ? {
                ...activeUserRowStyle,
                display: { xs: "none", md: "table-cell" },
              }
            : {
                display: { xs: "none", md: "table-cell" },
              }
        }
      >
        {row.guesses}
      </TableCell>
      <TableCell
        align="right"
        sx={row.User.username === username ? activeUserRowStyle : {}}
      >
        {row.points === 0 || row.guesses === 0
          ? 0
          : (row.ratio * 100).toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
