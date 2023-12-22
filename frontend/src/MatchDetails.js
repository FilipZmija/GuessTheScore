// MatchDetails.js
import React from "react";

const MatchDetails = ({ matchData }) => {
  const date = new Date(matchData.utcDate);
  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const timeString = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div>
      <h2>
        {matchData.homeTeam} vs {matchData.awayTeam}
      </h2>
      <p>Date: {dateString}</p>
      <p>Time: {timeString}</p>
      <p>Status: {matchData.status}</p>
      <p>Score: {matchData.score}</p>
      <img src={matchData.homeTeamCrest} alt={`${matchData.homeTeam} Logo`} />
      <span>{matchData.homeTeam}</span>
      <img src={matchData.awayTeamCrest} alt={`${matchData.awayTeam} Logo`} />
      <span>{matchData.awayTeam}</span>
    </div>
  );
};

export default MatchDetails;
