import * as React from "react";
import {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material/";
import axios from "axios";
import { useSelector } from "react-redux";

const activeUserRowStyle = {
  fontWeight: "bold",
  position: "sticky",
  bottom: 0,
  top: 0,
  background: "white",
  zIndex: 800,
};
const tableContainerStyle = {
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  maxHeight: { xs: "50vh", md: "35.5vh" },
};

const generateRow = (row, username) => (
  <TableRow
    key={row.name}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell
      component="th"
      scope="row"
      align="center"
      sx={row.username === username ? activeUserRowStyle : {}}
    >
      {row.ScoreboardUser.position}
    </TableCell>
    <TableCell
      component="th"
      scope="row"
      sx={row.username === username ? activeUserRowStyle : {}}
    >
      {row.username}
    </TableCell>
    <TableCell
      align="right"
      sx={
        row.username === username
          ? activeUserRowStyle
          : {
              display: { xs: "none", md: "table-cell" },
            }
      }
    >
      {row.guesses}
    </TableCell>
    <TableCell
      align="right"
      sx={row.username === username ? activeUserRowStyle : {}}
    >
      {row.points === 0 || row.guesses === 0 ? 0 : (row.ratio * 100).toFixed(2)}
    </TableCell>
  </TableRow>
);

export default function Scoretable({ scoreboardId }) {
  const [pages, setPages] = useState(2);
  const [isMore, setIsMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [loggedUser, setLoggedUser] = useState();
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const tableEl = useRef();

  const getScoreData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/scoreboards/${scoreboardId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            page: pages,
          },
        }
      );
      const {
        users,
        name: scoreboardName,
        loggedUser: recivedLoggedUser,
      } = response.data.scoreboard;
      if (users.length === 0) {
        setIsMore(false);
        setLoading(false);
        return;
      }
      setLoggedUser(recivedLoggedUser);
      setName(scoreboardName);
      setData((prev) => (prev ? [...prev, ...users] : users));
      setLoading(false);
      setPages(pages + 1);
    } catch (e) {
      console.error(e);
    }
  }, [pages, scoreboardId, token]);

  const scrollListener = useCallback(() => {
    let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    if (!distanceBottom) {
      setDistanceBottom(Math.round(bottom * 0.1));
    }
    if (
      tableEl.current.scrollTop > bottom - distanceBottom &&
      isMore &&
      !loading
    ) {
      getScoreData();
    }
  }, [distanceBottom, getScoreData, isMore, loading]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/scoreboards/${scoreboardId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              page: 1,
            },
          }
        );
        const {
          users,
          name: scoreboardName,
          loggedUser: recivedLoggedUser,
        } = response.data.scoreboard;
        setName(scoreboardName);
        setLoggedUser(recivedLoggedUser);
        setData(users);
        if (users.length === 0) setIsMore(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token, setData, setName, scoreboardId]);

  useLayoutEffect(() => {
    if (data) {
      const tableRef = tableEl.current;
      tableRef.addEventListener("scroll", scrollListener);
      return () => {
        tableRef.removeEventListener("scroll", scrollListener);
      };
    }
  }, [data, scrollListener]);

  return (
    data && (
      <TableContainer component={Paper} sx={tableContainerStyle} ref={tableEl}>
        {loading && (
          <CircularProgress style={{ position: "absolute", top: "100px" }} />
        )}

        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              paddingTop: "0.5rem",
              textAlign: "center",
            }}
          >
            {name}
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
                <TableCell
                  align="right"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  Guesses
                </TableCell>
                <TableCell align="right" sx={{ display: { md: "none" } }}>
                  Guesses
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  Ratio [%]
                </TableCell>
                <TableCell align="right" sx={{ display: { md: "none" } }}>
                  [%]
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => generateRow(row, username))}
              {loggedUser && generateRow(loggedUser, username)}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    )
  );
}
