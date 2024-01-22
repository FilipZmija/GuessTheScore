import * as React from "react";
import { useEffect } from "react";
import GameListSwitcher from "./GameListSwitcher";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { openDrawer } from "../redux/eventsSlice";
import NavBar from "../NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Scoretables from "../scoretable/Scoretables";
import LeagueScoretable from "../league_scoreboard/LeagueScoretable";
import { Grid } from "@mui/material";
import GuessContainer from "./GuessContainer";
const drawerWidth = 400;

function ResponsiveDrawer(props) {
  const mobileOpen = useSelector((state) => state.events.mobileOpen);

  const drawer = (
    <>
      <GameListSwitcher />
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar />
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => openDrawer()}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              xs: "block",
              sm: "block",
              md: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#EEE7DA",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#EEE7DA",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: "auto",
            marginRight: { lg: "0vw", xl: "2vw" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Toolbar />
          <Grid
            container
            sx={{
              justifyContent: { xs: "center" },
              flexDirection: { xs: "column", lg: "row" },
              width: "100%",
            }}
          >
            <Grid item sm={12} lg={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GuessContainer />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Scoretables />
              </Box>
            </Grid>
            <Grid
              item
              sm={0}
              lg={6}
              sx={{
                display: { xs: "none", m: "none", lg: "flex" },
                justifyContent: "center",
                alignSelf: "start",
              }}
            >
              <LeagueScoretable />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
