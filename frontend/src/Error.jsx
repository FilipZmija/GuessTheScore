import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { setOpen } from "./redux/errorSlice";

export default function Error() {
  const { message, open } = useSelector((state) => state.error);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message ||
              "Something went wrong... Please report with to developer screenshot of your browser logs (F12)"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
