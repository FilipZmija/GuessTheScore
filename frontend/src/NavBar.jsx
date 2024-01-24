import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "./redux/eventsSlice";
const handleLogout = (dispatchFnc) => {
  localStorage.removeItem("token");
  dispatchFnc(logout());
};
const menuFnc = [handleLogout];
const settings = ["Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { token, username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleDrawerToggle = () => {
    dispatch(openDrawer());
  };
  const handleClick = (index) => {
    menuFnc[index](dispatch);
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <SportsSoccerIcon
            sx={{ display: { sm: "flex", xs: "none" }, ml: "2%" }}
          />
          <SportsSoccerIcon sx={{ display: { sm: "none", xs: "flex" } }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 2,
              display: { md: "flex", sm: "none", xs: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GUESS THE SCORE
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 2,
              mr: 2,
              display: { md: "none", sm: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GTS
          </Typography>
        </Box>
        {token && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={username}
                  src="/static/images/avatar/2.jpg"
                  sx={{ backgroundColor: "#ece3ce", color: "#88AB8E" }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting} onClick={() => handleClick(index)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
