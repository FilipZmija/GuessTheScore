import * as React from "react";
import GameListSwitcher from "./GameListSwitcher";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { openDrawer } from "../redux/eventsSlice";

const drawerWidth = 400;

function ResponsiveDrawer(props) {
  const mobileOpen = useSelector((state) => state.events.mobileOpen);

  const drawer = (
    <>
      <GameListSwitcher />
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: "#AFC8AD",
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#EEE7DA",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
