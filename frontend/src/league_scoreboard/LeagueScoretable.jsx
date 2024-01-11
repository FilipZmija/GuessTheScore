import * as React from "react";
import { TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function LeagueScoretable() {
  const data = {
    filters: {
      season: "2023",
    },
    area: {
      id: 2072,
      name: "England",
      code: "ENG",
      flag: "https://crests.football-data.org/770.svg",
    },
    competition: {
      id: 2021,
      name: "Premier League",
      code: "PL",
      type: "LEAGUE",
      emblem: "https://crests.football-data.org/PL.png",
    },
    season: {
      id: 1564,
      startDate: "2023-08-11",
      endDate: "2024-05-19",
      currentMatchday: 21,
      winner: null,
    },
    standings: {
      stage: "REGULAR_SEASON",
      type: "TOTAL",
      group: null,
      table: [
        {
          position: 1,
          team: {
            id: 64,
            name: "Liverpool FC",
            shortName: "Liverpool",
            tla: "LIV",
            crest: "https://crests.football-data.org/64.png",
          },
          playedGames: 20,
          form: "W,W,D,D,W",
          won: 13,
          draw: 6,
          lost: 1,
          points: 45,
          goalsFor: 43,
          goalsAgainst: 18,
          goalDifference: 25,
        },
        {
          position: 2,
          team: {
            id: 58,
            name: "Aston Villa FC",
            shortName: "Aston Villa",
            tla: "AVL",
            crest: "https://crests.football-data.org/58.png",
          },
          playedGames: 20,
          form: "W,L,D,W,W",
          won: 13,
          draw: 3,
          lost: 4,
          points: 42,
          goalsFor: 43,
          goalsAgainst: 27,
          goalDifference: 16,
        },
        {
          position: 3,
          team: {
            id: 65,
            name: "Manchester City FC",
            shortName: "Man City",
            tla: "MCI",
            crest: "https://crests.football-data.org/65.png",
          },
          playedGames: 19,
          form: "W,W,D,W,L",
          won: 12,
          draw: 4,
          lost: 3,
          points: 40,
          goalsFor: 45,
          goalsAgainst: 21,
          goalDifference: 24,
        },
        {
          position: 4,
          team: {
            id: 57,
            name: "Arsenal FC",
            shortName: "Arsenal",
            tla: "ARS",
            crest: "https://crests.football-data.org/57.png",
          },
          playedGames: 20,
          form: "L,L,D,W,L",
          won: 12,
          draw: 4,
          lost: 4,
          points: 40,
          goalsFor: 37,
          goalsAgainst: 20,
          goalDifference: 17,
        },
        {
          position: 5,
          team: {
            id: 73,
            name: "Tottenham Hotspur FC",
            shortName: "Tottenham",
            tla: "TOT",
            crest: "https://crests.football-data.org/73.svg",
          },
          playedGames: 20,
          form: "W,L,W,W,W",
          won: 12,
          draw: 3,
          lost: 5,
          points: 39,
          goalsFor: 42,
          goalsAgainst: 29,
          goalDifference: 13,
        },
        {
          position: 6,
          team: {
            id: 563,
            name: "West Ham United FC",
            shortName: "West Ham",
            tla: "WHU",
            crest: "https://crests.football-data.org/563.png",
          },
          playedGames: 20,
          form: "D,W,W,W,L",
          won: 10,
          draw: 4,
          lost: 6,
          points: 34,
          goalsFor: 33,
          goalsAgainst: 30,
          goalDifference: 3,
        },
        {
          position: 7,
          team: {
            id: 397,
            name: "Brighton & Hove Albion FC",
            shortName: "Brighton Hove",
            tla: "BHA",
            crest: "https://crests.football-data.org/397.svg",
          },
          playedGames: 20,
          form: "D,W,D,L,D",
          won: 8,
          draw: 7,
          lost: 5,
          points: 31,
          goalsFor: 38,
          goalsAgainst: 33,
          goalDifference: 5,
        },
        {
          position: 8,
          team: {
            id: 66,
            name: "Manchester United FC",
            shortName: "Man United",
            tla: "MUN",
            crest: "https://crests.football-data.org/66.png",
          },
          playedGames: 20,
          form: "L,W,L,D,L",
          won: 10,
          draw: 1,
          lost: 9,
          points: 31,
          goalsFor: 22,
          goalsAgainst: 27,
          goalDifference: -5,
        },
        {
          position: 9,
          team: {
            id: 67,
            name: "Newcastle United FC",
            shortName: "Newcastle",
            tla: "NEW",
            crest: "https://crests.football-data.org/67.png",
          },
          playedGames: 20,
          form: "L,L,L,W,L",
          won: 9,
          draw: 2,
          lost: 9,
          points: 29,
          goalsFor: 39,
          goalsAgainst: 29,
          goalDifference: 10,
        },
        {
          position: 10,
          team: {
            id: 61,
            name: "Chelsea FC",
            shortName: "Chelsea",
            tla: "CHE",
            crest: "https://crests.football-data.org/61.png",
          },
          playedGames: 20,
          form: "W,W,L,W,L",
          won: 8,
          draw: 4,
          lost: 8,
          points: 28,
          goalsFor: 34,
          goalsAgainst: 31,
          goalDifference: 3,
        },
        {
          position: 11,
          team: {
            id: 76,
            name: "Wolverhampton Wanderers FC",
            shortName: "Wolverhampton",
            tla: "WOL",
            crest: "https://crests.football-data.org/76.svg",
          },
          playedGames: 20,
          form: "W,W,W,L,D",
          won: 8,
          draw: 4,
          lost: 8,
          points: 28,
          goalsFor: 30,
          goalsAgainst: 31,
          goalDifference: -1,
        },
        {
          position: 12,
          team: {
            id: 62,
            name: "Everton FC",
            shortName: "Everton",
            tla: "EVE",
            crest: "https://crests.football-data.org/62.png",
          },
          playedGames: 20,
          form: "L,L,L,W,W",
          won: 8,
          draw: 2,
          lost: 10,
          points: 26,
          goalsFor: 24,
          goalsAgainst: 28,
          goalDifference: -4,
        },
        {
          position: 13,
          team: {
            id: 1044,
            name: "AFC Bournemouth",
            shortName: "Bournemouth",
            tla: "BOU",
            crest: "https://crests.football-data.org/1044.png",
          },
          playedGames: 19,
          form: "L,W,W,W,W",
          won: 7,
          draw: 4,
          lost: 8,
          points: 25,
          goalsFor: 28,
          goalsAgainst: 35,
          goalDifference: -7,
        },
        {
          position: 14,
          team: {
            id: 63,
            name: "Fulham FC",
            shortName: "Fulham",
            tla: "FUL",
            crest: "https://crests.football-data.org/63.svg",
          },
          playedGames: 20,
          form: "W,L,L,L,W",
          won: 7,
          draw: 3,
          lost: 10,
          points: 24,
          goalsFor: 28,
          goalsAgainst: 35,
          goalDifference: -7,
        },
        {
          position: 15,
          team: {
            id: 354,
            name: "Crystal Palace FC",
            shortName: "Crystal Palace",
            tla: "CRY",
            crest: "https://crests.football-data.org/354.png",
          },
          playedGames: 20,
          form: "W,L,D,D,L",
          won: 5,
          draw: 6,
          lost: 9,
          points: 21,
          goalsFor: 22,
          goalsAgainst: 29,
          goalDifference: -7,
        },
        {
          position: 16,
          team: {
            id: 351,
            name: "Nottingham Forest FC",
            shortName: "Nottingham",
            tla: "NOT",
            crest: "https://crests.football-data.org/351.png",
          },
          playedGames: 20,
          form: "W,W,L,L,D",
          won: 5,
          draw: 5,
          lost: 10,
          points: 20,
          goalsFor: 24,
          goalsAgainst: 35,
          goalDifference: -11,
        },
        {
          position: 17,
          team: {
            id: 402,
            name: "Brentford FC",
            shortName: "Brentford",
            tla: "BRE",
            crest: "https://crests.football-data.org/402.png",
          },
          playedGames: 19,
          form: "L,L,L,L,L",
          won: 5,
          draw: 4,
          lost: 10,
          points: 19,
          goalsFor: 26,
          goalsAgainst: 31,
          goalDifference: -5,
        },
        {
          position: 18,
          team: {
            id: 389,
            name: "Luton Town FC",
            shortName: "Luton Town",
            tla: "LUT",
            crest: "https://crests.football-data.org/389.png",
          },
          playedGames: 19,
          form: "L,W,W,L,L",
          won: 4,
          draw: 3,
          lost: 12,
          points: 15,
          goalsFor: 23,
          goalsAgainst: 37,
          goalDifference: -14,
        },
        {
          position: 19,
          team: {
            id: 328,
            name: "Burnley FC",
            shortName: "Burnley",
            tla: "BUR",
            crest: "https://crests.football-data.org/328.png",
          },
          playedGames: 20,
          form: "L,L,W,L,D",
          won: 3,
          draw: 2,
          lost: 15,
          points: 11,
          goalsFor: 20,
          goalsAgainst: 41,
          goalDifference: -21,
        },
        {
          position: 20,
          team: {
            id: 356,
            name: "Sheffield United FC",
            shortName: "Sheffield Utd",
            tla: "SHE",
            crest: "https://crests.football-data.org/356.svg",
          },
          playedGames: 20,
          form: "L,L,D,L,W",
          won: 2,
          draw: 3,
          lost: 15,
          points: 9,
          goalsFor: 15,
          goalsAgainst: 49,
          goalDifference: -34,
        },
      ],
    },
  };
  return (
    data && (
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 650,
          padding: "20px",
          backgroundColor: "#EEE7DA",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box sx={{ backgroundColor: "#faf8f5" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              paddingTop: "10px",
              textAlign: "center",
            }}
          >
            {data.competition.name}
          </Typography>
          <Table
            aria-label="simple table"
            sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12);" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell align="right">MP</TableCell>
                <TableCell align="right">W</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">G</TableCell>
                <TableCell align="right">PTS</TableCell>
                <TableCell align="right">Ratio [%]</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.standings.table.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.position}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.team.shortName}
                  </TableCell>
                  <TableCell align="right">{row.playedGames}</TableCell>
                  <TableCell align="right">{row.guesses}</TableCell>
                  <TableCell align="right">{row.points}</TableCell>
                  <TableCell align="right">{row.won}</TableCell>
                  <TableCell align="right">{row.draft}</TableCell>
                  <TableCell align="right">{row.lost}</TableCell>
                  <TableCell align="right">
                    {row.goalsFor}:{row.goalsAgainst}
                  </TableCell>
                  <TableCell align="right">{row.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    )
  );
}
