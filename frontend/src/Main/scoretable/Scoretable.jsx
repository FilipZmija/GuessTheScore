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
import { setOpen } from "../../redux/errorSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setScoreboardCode } from "../../redux/scoreboardSlice";
import ScoretableRow from "./ScoretableRow";

const tableContainerStyle = {
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  maxHeight: { xs: "50vh", md: "35.5vh" },
  backgroundColor: "#faf8f5",
};

export default function Scoretable({ scoreboardId, active, index }) {
  const [pages, setPages] = useState(2);
  const [isMore, setIsMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [data, setData] = useState();
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const tableEl = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      if (active === index) {
        dispatch(setScoreboardCode(data.hash));
      }
    }
  }, [active, index, data, dispatch]);

  const getScoreData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/scoreboards/new/${scoreboardId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            page: pages,
          },
        }
      );
      const { scores, loggedUser } = response.data.scoreboard;
      if (scores.length === 0) {
        setIsMore(false);
        setLoading(false);
        return;
      }
      setData((prev) =>
        prev
          ? { ...prev, loggedUser, scores: [...prev.scores, ...scores] }
          : { ...prev, loggedUser, scores }
      );
      setLoading(false);
      setPages(pages + 1);
    } catch (e) {
      dispatch(setOpen(true));
      console.error(e);
    }
  }, [pages, scoreboardId, token, dispatch]);

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
          `${process.env.REACT_APP_API_URL}/scoreboards/new/${scoreboardId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              page: 1,
            },
          }
        );
        const { scores, name, loggedUser, hash } = response.data.scoreboard;
        setData({ scores, name, hash, loggedUser });
        if (scores.length === 0) setIsMore(false);
      } catch (e) {
        dispatch(setOpen(true));
        console.error(e);
      }
    })();
  }, [token, setData, scoreboardId, dispatch]);

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
              fontWeight: "bold",
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
              <TableRow key="toprow">
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  Guesses
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  Ratio [%]
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", display: { md: "none" } }}
                >
                  [%]
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.scores.map((row) => (
                <ScoretableRow
                  key={row.User.username}
                  row={row}
                  username={username}
                />
              ))}
              {data.loggedUser && (
                <ScoretableRow
                  key={data.loggedUser.User.username}
                  row={data.loggedUser}
                  username={username}
                />
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    )
  );
}
