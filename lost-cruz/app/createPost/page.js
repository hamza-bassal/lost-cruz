// This is the page for creating a post where the user can upload an image of the lost/found item.

"use client";

import {
  Box,
  IconButton,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Link,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/navigation"; // Import Next.js router

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../../firebase";
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { tagOptions } from '../data/tagsData';

import useAuthStore from "../store/authStore";

import styles from "./createPost.module.css";

import { useRequireAuth } from "../hooks/useRequireAuth";

import { Timestamp } from "firebase/firestore";

const CreatePost = () => {
  const authUser1 = useRequireAuth(); // Redirects to login if not authenticated
  const router = useRouter(); // Initialize Next.js router
  const authUser = useAuthStore((state) => state.user);

  // uploading picture
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // title, description, status, and location states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lostOrFound, setStatus] = useState("LOST");
  const [location, setLocation] = useState("");

  const [openLocBox, setOpenLocBox] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [tags, setTags] = useState([])
  const [inputTags, setInputTags] = useState("");

  useEffect(() => {
    // Set isClient to true once the component mounts
    setIsClient(true);
  }, []);

  if (!authUser1 || !isClient) {
    // Show nothing or a loading spinner while redirecting or if not loaded
    return null;
  }

  // Handle adding selected tags to the TextField
  const handleTagChange = (event) => {
    const value = event.target.value;
    // Add tag only if it hasn't been selected already
    if (!tags.includes(value)) {
      setTags([...tags, value]);
      setInputTags([...tags, value].join(", ")); // Update input value to show selected tags
    }
  };

  // Handle manual input change in TextField
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputTags(value);

    // Split input by commas to get tags
    const newTags = value.split(",").map(tag => tag.trim()).filter(tag => tag);
    
    // Update tags state with unique tags only
    const uniqueTags = [...new Set([...newTags])];
    setTags(uniqueTags);
  };

  // Image selection handler
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Save location handler
  const handleSaveLocation = () => {
    if (location) {
      setOpenLocBox(false);
    } else {
      alert("Please enter a location");
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !file || !location) {
      alert("Please fill out all required fields.");
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    let url = "";

    try {
      await uploadBytes(storageRef, file);
      url = await getDownloadURL(storageRef);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the files", error);
    } finally {
      setUploading(false);
    }

    // Upload the post data to Firestore
    const postsCollection = collection(firestore, "posts");
    await addDoc(postsCollection, {
      title,
      description,
      imageURL: url,
      lostOrFound,
      timestamp: Timestamp.now(),
      userID: authUser.uid,
      tags,
      imageName: file.name,
      location, // Ensure location is included
    })
      .then(async(docRef) => {
        console.log("Document written with ID: ", docRef.id);

        // Update the user's posts array in Firestore
        const userDocRef = doc(firestore, "users", authUser.uid);
        await updateDoc(userDocRef, {
          posts: arrayUnion(docRef.id),
        })
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    // Reset form fields after submission
    setFile(null);
    setTitle("");
    setDescription("");
    setLocation("");
    setStatus("LOST");
    alert("Post uploaded successfully!");

    // Redirect to the forum page after successful upload
    router.push("/forum");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FCF7ED",
        width: "100vw",
        position: "absolute",
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
        <Link>
          {" "}
          {/**href={`/forum`} prevents from entries uploading to firestore*/}
          <IconButton
            onClick={handleUpload}
            disabled={uploading}
            sx={{ color: "#FFC436" }}
          >
            <SendIcon fontSize="large" />
          </IconButton>
        </Link>
      </Box>
      {/* post content */}
      <FormControl
        component="form"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* title container */}
        <Box
          sx={{
            width: "inherit",
            alignSelf: "center",
            padding: "20px",
            paddingLeft: "7.5%",
            paddingRight: "7.5%",
          }}
        >
          {/* input title */}
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
              bgcolor: "white",
              borderRadius: "5px",
              paddingLeft: "5px",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        {/* post body container */}
        <Box
          sx={{
            width: "inherit",
            alignSelf: "center",
            padding: "20px",
            paddingLeft: "7.5%",
            paddingRight: "7.5%",
          }}
        >
          {/* input description */}
          <TextField
            fullWidth
            multiline
            rows={15}
            id="description"
            placeholder="Description"
            InputProps={{ style: { fontSize: 20 } }}
            sx={{
              bgcolor: "white",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        {/* Tags, optional, make array of tags */}
        <Box className={styles.inputBox} sx={{ gap: "30px" }}>
			<label style={{ minWidth: '100px' }}>Tags (Max 5): </label>
			<TextField
				id="tags"
				required
				variant="standard"
				fullWidth
				placeholder="Tags"
				value={inputTags}
				onChange={handleInputChange}
				sx={{ bgcolor: "white", paddingLeft: "3px", borderRadius: "5px" }}
			></TextField>
			<FormControl variant="standard" sx={{ minWidth: 200, display: 'flex', alignItems: 'center'}}>
              	<Select
            		labelId="select-tag-label"
                  	onChange={handleTagChange}
                  	fullWidth
                  	displayEmpty
                  	defaultValue="" // Placeholder value for Select
                  	sx={{ bgcolor: "white", borderRadius: "5px" }}
					MenuProps={{
						PaperProps: {
							sx: {
								maxHeight: 200,  // Max height for scrollable dropdown
								overflow: 'auto', // Makes the menu scrollable
							},
						},
					}}
              	>
					{/* Placeholder option */}
					<MenuItem value="" disabled>
						<em>Select a tag</em>
					</MenuItem>
					{tagOptions.map((tag) => (
						<MenuItem key={tag} value={tag}>
							{tag}
						</MenuItem>	
					))}
              </Select>
          </FormControl>
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
          value={lostOrFound}
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
      {/* To leave some space at the bottom so the tool bar won't block anything */}
      {/* Tools */}
      <Box
        className={styles.toolBox}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Adding image, maybe have a button saying "Choose file" instead? */}
        <Box className={styles.inputBox}>
          <label htmlFor="image-upload">
            {" "}
            {/**changed to htmlFor from for */}
            <AddIcon className={styles.icon} />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }} /* removes "Choose file" button */
            id="image-upload"
          />
        </Box>

        {/* Add Location, temporarily typing location instead*/}
        <Box className={styles.inputBox}>
          <IconButton
            onClick={() => {
              setOpenLocBox(true);
            }}
          >
            <AddLocationIcon className={styles.icon} />
          </IconButton>
        </Box>
        {openLocBox && (
          // A pop-up window asking for location
          <Box className={styles.popup}>
            {/* Close button */}
            <IconButton
              sx={{ color: "#0174BE" }}
              onClick={() => {
                setOpenLocBox(false);
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Input for location with button next to it */}
            <Box
              className={styles.inputBox}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {/* Input for Location */}
              <TextField
                id="location"
                required
                variant="standard"
                fullWidth
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{
                  flex: 1,
                }}
              />

              {/* Save Location Button */}
              <Button
                sx={{
                  padding: "5px 10px",
                  minWidth: "120px",
                  backgroundColor: "#FFC436",
                  "&:hover": {
                    backgroundColor: "#FFB232",
                  },
                }}
                variant="contained"
                color="primary"
                onClick={handleSaveLocation}
              >
                Save Location
              </Button>
            </Box>
          </Box>
        )}

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

export default CreatePost;