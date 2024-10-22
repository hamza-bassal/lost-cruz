"use client";

import {
  Box,
  IconButton,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArticleIcon from "@mui/icons-material/Article";

import styles from "./createPost.module.css";

const createPost = () => {
  const { image, setImage } = useState(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
      }}
    >
      {/* close + send */}
      <Box className={styles.closeSend}>
        <IconButton sx={{ color: "#0174BE" }}>
          <CloseIcon fontSize="large" />
        </IconButton>

        <IconButton sx={{ color: "#FFC436" }}>
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* post content */}
      <FormControl
        component="form"
        sx={{
          width: "100%",
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* title */}
        <TextField
          required
          fullWidth
          multiline
          id="title"
          variant="standard"
          placeholder="Title"
          InputProps={{ style: { fontSize: 30 } }}
          InputLabelProps={{ style: { fontSize: 30 } }}
          sx={{
            alignSelf: "center",
            padding: "20px",
            paddingLeft: "7.5%",
            paddingRight: "7.5%",
          }}
        ></TextField>

        {/* post body */}
        <TextField
          fullWidth
          multiline
          rows={15}
          id="description"
          placeholder="Description"
          InputProps={{ style: { fontSize: 20 } }}
          sx={{
            alignSelf: "center",
            padding: "20px",
            paddingLeft: "7.5%",
            paddingRight: "7.5%",
          }}
        ></TextField>

        {/* Email */}
        <Box className={styles.inputBox}>
          <label>Email Address: </label>
          <TextField
            id="email"
            required
            variant="standard"
            fullWidth
            placeholder="email"
          ></TextField>
        </Box>

        {/* Tags */}
        <Box className={styles.inputBox} sx={{ gap: "30px" }}>
          <label>Tags: </label>
          <TextField
            id="tags"
            required
            variant="standard"
            fullWidth
            placeholder="tags"
          ></TextField>
        </Box>

        {/* Lost or Found */}
        <RadioGroup
          defaultValue="LOST"
          row
          sx={{
            padding: "20px",
            paddingLeft: "7.5%",
            paddingRight: "7.5%",
            gap: "20px",
          }}
        >
          <FormControlLabel
            value="LOST"
            control={<Radio />}
            label="LOST"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
          ></FormControlLabel>
          <FormControlLabel
            value="FOUND"
            control={<Radio />}
            label="FOUND"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>

      <Box sx={{ height: "60px" }}></Box>

      {/* Tools */}
      <Box
        className={styles.toolBox}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Add image */}
        <Box className={styles.inputBox}>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload"/>
            <IconButton>
              <AddIcon className={styles.icon} />
            </IconButton>
        </Box>

        {/* Add Location */}
        <Box className={styles.inputBox}>
        <IconButton>
          <AddLocationIcon className={styles.icon} />
        </IconButton>
        </Box>

        {/* Save to draft */}
        <Box className={styles.inputBox}>
        <IconButton>
          <ArticleIcon className={styles.icon} />
        </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default createPost;
