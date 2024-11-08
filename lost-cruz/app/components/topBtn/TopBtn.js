"use client";

import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TopBtn = () => {
  return (
    <div>
      <IconButton
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        sx={{
          position: "fixed",
          bottom: "4%",
          right: "3%",
        }}
      >
        <KeyboardArrowUpIcon
          sx={{
            borderStyle: "solid",
            borderColor: "#0174BE",
            borderWidth: "1px",
            borderRadius: "50px",
            height: "50px",
            width: "50px",
            color: "white",
            bgcolor: "#0174BE",
          }}
        />
      </IconButton>
    </div>
  );
};

export default TopBtn;
