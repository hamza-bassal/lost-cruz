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
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/navigation";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

import useAuthStore from "../store/authStore";
import { useRequireAuth } from "../hooks/useRequireAuth";

import styles from "./createPost.module.css";

const CreatePost = () => {
  const authUser1 = useRequireAuth(); // Ensures the user is authenticated
  const router = useRouter(); 
  const authUser = useAuthStore((state) => state.user);

  // Initialize all states here
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lostOrFound, setStatus] = useState("LOST");
  const [location, setLocation] = useState("");
  const [openLocBox, setOpenLocBox] = useState(false);

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!authUser1) {
      return; // Show nothing or a loading spinner while redirecting
    }
  }, [authUser1]);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle post upload
  const handleUpload = async () => {
    if (!title || !description || !file) {
      alert("Please fill out all required fields.");
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    let url = '';
    try {
      await uploadBytes(storageRef, file);
      url = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading the file", error);
    } finally {
      setUploading(false);
    }

    const postsCollection = collection(firestore, "posts");
    await addDoc(postsCollection, {
      title,
      description,
      imageURL: url,
      lostOrFound,
      timestamp: new Date(),
      userID: authUser.uid,
    })
      .then((docRef) => {
        console.log("Document written with ID:", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });

    setFile(null);
    setTitle("");
    setDescription("");
    setLocation("");
    setStatus("LOST");
    alert("Post uploaded successfully!");

    router.push("/forum");
  };

  // If `authUser1` is null, display nothing or loading
  if (!authUser1) {
    return <p>Loading...</p>; // Or a spinner
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FCF7ED",
      }}
    >
      {/* Close and Send buttons */}
      <Box className={styles.closeSend}>
        <Link href={`/forum`}>
          <IconButton sx={{ color: "#0174BE" }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Link>
        <IconButton onClick={handleUpload} disabled={uploading} sx={{ color: "#FFC436" }}>
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Form */}
      <FormControl component="form" sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "inherit", alignSelf: "center", padding: "20px", paddingLeft: "7.5%", paddingRight: "7.5%" }}>
          <TextField
            required
            fullWidth
            multiline
            id="title"
            variant="standard"
            placeholder="Title"
            InputProps={{ style: { fontSize: 30 } }}
            sx={{ bgcolor: "white", borderRadius: "5px", paddingLeft: "5px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box sx={{ width: "inherit", alignSelf: "center", padding: "20px", paddingLeft: "7.5%", paddingRight: "7.5%" }}>
          <TextField
            fullWidth
            multiline
            rows={15}
            id="description"
            placeholder="Description"
            InputProps={{ style: { fontSize: 20 } }}
            sx={{ bgcolor: "white" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <RadioGroup
          defaultValue="LOST"
          row
          sx={{ padding: "20px", paddingLeft: "7.5%", paddingRight: "7.5%", gap: "20px" }}
          value={lostOrFound}
          onChange={(e) => setStatus(e.target.value)}
        >
          <FormControlLabel value="LOST" control={<Radio />} label="LOST" />
          <FormControlLabel value="FOUND" control={<Radio />} label="FOUND" />
        </RadioGroup>
      </FormControl>

      <Box sx={{ height: "60px" }}></Box>

      {/* Tools */}
      <Box className={styles.toolBox} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box className={styles.inputBox}>
          <label htmlFor="image-upload">
            <AddIcon className={styles.icon} />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="image-upload"
          />
        </Box>

        <Box className={styles.inputBox}>
          <IconButton onClick={() => setOpenLocBox(true)}>
            <AddLocationIcon className={styles.icon} />
          </IconButton>
        </Box>

        {openLocBox && (
          <Box className={styles.popup}>
            <IconButton sx={{ color: "#0174BE" }} onClick={() => setOpenLocBox(false)}>
              <CloseIcon />
            </IconButton>
            <Box className={styles.inputBox} sx={{ gap: "30px" }}>
              <label>Location: </label>
              <TextField
                id="location"
                required
                variant="standard"
                fullWidth
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CreatePost;
