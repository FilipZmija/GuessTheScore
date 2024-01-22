import * as React from "react";
import {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material/";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
let pages = 1;
export default function Scoretable({ scoreboardId }) {
  const [data, setData] = useState();
  const [name, setName] = useState();
  let isMore = true;
  let loading = false;
  const [distanceBottom, setDistanceBottom] = useState(10);
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const tableEl = useRef();

  const getScoreData = async () => {
    loading = true;
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
      const { users, name: scoreboardName } = response.data.scoreboard;
      console.log(users);
      if (users.length === 0) {
        isMore = false;
        return;
      }
      console.log(users);
      setName(scoreboardName);
      setData((prev) => (prev ? [...prev, ...users] : users));
      loading = false;
      pages++;
    } catch (e) {
      console.log(e);
    }
  };

  const scrollListener = () => {
    let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    // if (!distanceBottom) {
    //   setDistanceBottom(Math.round(bottom * 0.1));
    // }
    if (
      tableEl.current.scrollTop > bottom - distanceBottom &&
      isMore &&
      !loading
    ) {
      console.log(loading, isMore);
      getScoreData();
    }
  };

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
              page: pages,
            },
          }
        );
        const { users, name: scoreboardName } = response.data.scoreboard;
        setName(scoreboardName);
        console.log("here");
        setData((prev) => (prev ? [...prev, ...users] : users));
        if (users.length === 0) isMore = false;
        pages++;
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useLayoutEffect(() => {
    if (data) {
      const tableRef = tableEl.current;
      tableRef.addEventListener("scroll", scrollListener);
      return () => {
        tableRef.removeEventListener("scroll", scrollListener);
      };
    }
  }, [scrollListener]);

  return (
    data && (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          maxHeight: { xs: "100vh", md: "35.5vh" },
        }}
        ref={tableEl}
      >
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
              {data?.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={row.username === username ? { fontWeight: "bold" } : {}}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={row.username === username ? { fontWeight: "bold" } : {}}
                  >
                    {row.username}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={row.username === username ? { fontWeight: "bold" } : {}}
                  >
                    {row.guesses}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={row.username === username ? { fontWeight: "bold" } : {}}
                  >
                    {row.points === 0 || row.guesses === 0
                      ? 0
                      : row.ratio * 100}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    )
  );
}
