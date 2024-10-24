// This is the page for creating a post where the user can upload an image of the lost/found item.

"use client";

import {
  Box,
  IconButton,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArticleIcon from "@mui/icons-material/Article";

import Image from 'next/image';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../../firebase"
import { collection, addDoc } from 'firebase/firestore';


import styles from "./createPost.module.css";

const createPost = () => {
  // uploading picture
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  //title
  const [title, setTitle] = useState("");  // New state for title
  const [description, setDescription] = useState("");  // New state for title
  const [lostOrFound, setStatus] = useState("LOST");  // Default value is "LOST"
  const [location, setLocation] = useState("");  


  // called when an image is selected
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // when uploading a post!
  const handleUpload = async () => {

    (title?console.log("yaas there is a title"):console.log("nah no title"));
    (description?console.log("yes description"):console.log("no description"));
    (location?console.log("yes location"):console.log("no Location"));
    console.log(lostOrFound)



    // uploading picture
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    let url = '';
    try {
        await uploadBytes(storageRef, file);
        url = await getDownloadURL(storageRef);
        console.log(url);
        console.log("File Uploaded Successfuly");
    } catch (error) {
        console.error("Error uploading the files", error)
    } finally {
        setUploading(false);
    }
    // adding metadata to firestore
    const postsCollection = collection(firestore, "posts");
    await addDoc(postsCollection, {
      title: title,
      description: description,
      imageURL: url,
      lostOrFound: lostOrFound,
      timestamp: new Date(),
    });

    // Reset form, doesnt reset current form entries
     setFile(null);
     setTitle("")
     setDescription("");
     setLocation("");
     setStatus("LOST");
     alert("Post uploaded successfully!");

    // Programmatically navigate to the forum page after successful upload
    router.push("/forum");
  }

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
        <Link href={`/forum`}>
            <IconButton sx={{ color: "#0174BE" }}>
                <CloseIcon fontSize="large" />
            </IconButton>
        </Link>

        {/*submits form entries */}
        <Link href={`/forum`}>
            <IconButton onClick={handleUpload} disabled={uploading} sx={{ color: "#FFC436" }}>
                <SendIcon fontSize="large" />
            </IconButton>
        </Link>
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
          // InputProps={{ style: { fontSize: 30 } }}
          // InputLabelProps={{ style: { fontSize: 30 } }}
          sx={{
            alignSelf: "center",
            padding: "20px",
            paddingLeft: "7.5%",
            paddingRight: "7.5%",
          }} 
            value = {title}
            onChange={(e) => setTitle(e.target.value)}
          />

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
          value = {description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Email, redundant? Email should be linked to profile. */}
        <Box className={styles.inputBox}>
          <label>Email Address: </label>
          <TextField
            id="email"
            required
            variant="standard"
            fullWidth
            placeholder="email, redundant?"
          ></TextField>
        </Box>

        {/* Tags, optional, make array of tags */}
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
          value = {lostOrFound}
          onChange={(e) => setStatus(e.target.value)}
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

      <Box sx={{ height: "60px" }}></Box> {/* what for? */}

      {/* Tools */}
      <Box
        className={styles.toolBox}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Adding image, maybe have a button saying "Choose file" instead? */}
        <Box className={styles.inputBox}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            // style={{ display: "none" }} /* removes "Choose file" button */
            id="image-upload"
          />
          <label htmlFor="image-upload" />
          
          

          {/* hamza commented out 'plus' button to add pics*/}
          {/* <IconButton>
            <AddIcon className={styles.icon} />
          </IconButton> */}
        </Box>

        {/* Add Location, temporarily typing location instead*/}
        {/* <Box className={styles.inputBox}>
          <IconButton>
            <AddLocationIcon className={styles.icon} />
          </IconButton>
        </Box> */}
        {/* Tags, optional, make array of tags */}
        <Box className={styles.inputBox} sx={{ gap: "30px" }}>
          <label>Location: </label>
          <TextField
            id="location"
            required
            variant="standard"
            fullWidth
            placeholder="location"
            value = {location}
            onChange={(e) => setLocation(e.target.value)}
          />
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