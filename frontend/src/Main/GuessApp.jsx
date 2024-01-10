import * as React from "react";
import GameListSwitcher from "./GameListSwitcher";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { openDrawer } from "../redux/eventsSlice";
import NavBar from "../NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import GameGuess from "./GameGuess";
import Scoretables from "../scoretable/Scoretables";
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
            marginRight: { lg: "4vw", xl: "6vw" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Toolbar />
          <GameGuess />
          <Scoretables />
          {/* </Box> */}
        </Box>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
