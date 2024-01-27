import React, { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";
const CopyButton = () => {
  const code = useSelector((state) => state.scoreboard.code);
  const [open, setOpen] = useState(false);
  const handleClick = async () => {
    setOpen(true);
    copy(code);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="primary">
        <ShareIcon />
      </IconButton>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};

export default CopyButton;
