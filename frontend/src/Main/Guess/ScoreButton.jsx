import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
export default function ScoreButton({ score }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };
  return (
    <Button
      pill
      onClick={handleToggle}
      sx={{
        margin: "0px 3px",
        padding: "2px  0px",
        borderRadius: "999px",
        border: "1px solid #EEE7DA",
        backgroundColor: isClicked ? "#faf8f5" : "#88AB8E",
        color: isClicked ? "#88AB8E" : "#faf8f5", // Adjust text color as needed
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold",
        outline: "none",
        width: "1rem !important",
      }}
    >
      {score}
    </Button>
  );
}
