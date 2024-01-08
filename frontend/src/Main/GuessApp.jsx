import * as React from "react";
import GameListSwitcher from "./GameListSwitcher";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { openDrawer } from "../redux/eventsSlice";
import Scoretable from "../scoretable/Scoretable";
import NavBar from "../NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            marginRight: { lg: "4vw", xl: "6vw" },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              padding: "20px",
              backgroundColor: "#EEE7DA",
              width: "100%",
              borderRadius: "10px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Scoretable />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
