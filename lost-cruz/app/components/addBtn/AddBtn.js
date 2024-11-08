"use client";

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddBtn = () => {
  return (
    <div>
      <IconButton
        sx={{
          position: "fixed",
          bottom: "15%",
          right: "3%",
        }}
      >
        {/* redirect to create new post page */}
        <AddIcon
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

export default AddBtn;
