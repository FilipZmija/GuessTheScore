import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScoreboardId } from "../../redux/scoreboardSlice";
import { setOpen } from "../../redux/errorSlice";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Scoretable from "./Scoretable";

export default function Slides({ reload }) {
  const [scoreIds, setScoreIds] = useState();
  const [active, setActive] = useState();
  const token = useSelector((state) => state.auth.token);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  useEffect(() => {
    const getScoreData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/scoreboards/users/all`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setScoreIds(response.data);
        dispatch(setScoreboardId(response?.data[0].ScoreboardId));
      } catch (e) {
        dispatch(setOpen(true));
        console.error(e);
      }
    };
    getScoreData();
  }, [token, reload, dispatch]);

  return (
    scoreIds && (
      <Carousel
        sx={{ maxHeight: { xs: "100vh", md: "50vh" } }}
        onChange={(now) => {
          dispatch(setScoreboardId(scoreIds[now].ScoreboardId));
          setActive(now);
        }}
        autoPlay={false}
        fullHeightHover={isMobile}
        swipe={!isMobile}
        navButtonsWrapperProps={{
          style: {
            marginRight: "10px",
          },
        }}
        animation={"fade"}
      >
        {scoreIds.map((item, i) => (
          <Scoretable
            scoreboardId={item.ScoreboardId}
            key={i}
            index={i}
            active={active}
          />
        ))}
      </Carousel>
    )
  );
}
