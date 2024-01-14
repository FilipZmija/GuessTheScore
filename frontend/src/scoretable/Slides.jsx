import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import Scoretable from "./Scoretable";
export default function Slides(props) {
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
        setScoreData([response.data.scoreboard]);
      } catch (e) {
        console.log(e);
      }
    };
    getScoreData();
  }, []);

  return (
    scoreData && (
      <Carousel sx={{ maxHeight: "50vh" }}>
        {scoreData.map((item, i) => (
          <Scoretable data={item} />
        ))}
      </Carousel>
    )
  );
}
