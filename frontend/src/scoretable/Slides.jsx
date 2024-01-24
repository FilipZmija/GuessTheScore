import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScoreboardId } from "../redux/scoreboardSlice";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import Scoretable from "./Scoretable";
export default function Slides({ reload }) {
  const [scoreIds, setScoreIds] = useState();
  const token = useSelector((state) => state.auth.token);
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
        console.log(e);
      }
    };
    getScoreData();
  }, [token, reload]);

  return (
    scoreIds && (
      <Carousel
        sx={{ maxHeight: { xs: "100vh", md: "50vh" } }}
        onChange={(now, prev) => {
          dispatch(setScoreboardId(scoreIds[now].ScoreboardId));
        }}
        autoPlay={false}
        fullHeightHover={false}
        navButtonsWrapperProps={{
          style: {
            marginRight: "10px",
          },
        }}
        animation={"fade"}
      >
        {scoreIds.map((item, i) => (
          <Scoretable scoreboardId={item.ScoreboardId} />
        ))}
      </Carousel>
    )
  );
}
