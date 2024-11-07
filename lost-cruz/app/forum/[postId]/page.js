"use client";
// individual post
import {
  Container,
  Box,
  Button,
  Link,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

import styles from "./post.module.css";

import Navbar from "../../components/navbar/Navbar";
import TopBtn from "../../components/topBtn/TopBtn";

import { useRequireAuth } from "../../hooks/useRequireAuth";

const SingleComment = () => {
  return (
    <Box className={styles.commentContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "75px",
            width: "75px",
            bgcolor: "#FFC436",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {/* User Profile img here */}
        </Box>
        <Link href="#" sx={{ textDecoration: "none", color: "black" }}>
          username
        </Link>
      </Box>

      <Box className={styles.commentText}>
        <Box
          sx={{
            overflow: "auto",
            wordWrap: "break-word",
            marginBottom: "20px",
          }}
        >
          <p>
            paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...
          </p>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ alignSelf: "center", fontSize: "small", color: "gray" }}>
            hh:mm a/pm - MM/DD/YYYY
          </Box>
          <IconButton>
            <CommentIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

// postId retrieves data
async function getDocumentById(collectionName, documentId) {
  const docRef = doc(firestore, collectionName, documentId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

const CommentList = () => {
  return (
    <Box>
      <Box>
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <hr
          style={{
            marginTop: "50px",
            marginLeft: "20px",
            marginRight: "20px",
            borderTop: "dotted",
            color: "lightgray",
            borderWidth: "3px",
          }}
        />
      </Box>
      <Box sx={{ height: "100px", width: "auto" }}></Box>
    </Box>
  );
};

const LFtag = ({ tagName }) => {
  return (
    <Box className={styles.lfTag}>
      <Box className={styles.tagText}>{tagName}</Box>
    </Box>
  );
};

const Tag = ({ tagName }) => {
  return (
    <Box className={styles.tag}>
      <Box className={styles.tagText}>{tagName}</Box>
    </Box>
  );
};

const ShareButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [socialMediaLink, setSocialMediaLink] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyLinkToClipboard = () => {
    const linkToCopy = window.location.href;
    return navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        console.log("Link copied to clipboard");
        return true;
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
        return false;
      });
  };

  const openInstagram = async () => {
    const success = await copyLinkToClipboard();
    if (success) {
      setSocialMediaLink(
        `https://www.instagram.com/?url=${encodeURIComponent(
          window.location.href
        )}`
      );
      setOpenInstructions(true);
    } else {
      alert("Failed to copy link. Please try again.");
    }
    handleClose();
  };

  const openFacebook = async () => {
    const success = await copyLinkToClipboard();
    if (success) {
      setSocialMediaLink(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`
      );
      setOpenInstructions(true);
    } else {
      alert("Failed to copy link. Please try again.");
    }
    handleClose();
  };

  const openTwitter = async () => {
    const success = await copyLinkToClipboard();
    if (success) {
      const tweetText = "Check out this post from Lost@Cruz";
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetText
      )}&url=${encodeURIComponent(window.location.href)}`;
      setSocialMediaLink(twitterUrl);
      setOpenInstructions(true);
    } else {
      alert("Failed to copy link. Please try again.");
    }
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenInstructions(false);
  };

  const handleOpenSocialMedia = () => {
    window.open(socialMediaLink, "_blank");
    handleDialogClose();
  };

  const openMail = () => {
    const subject = "Check out this post from Lost@Cruz";
    const body = `Here's the link: ${window.location.href}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <ShareIcon sx={{ paddingLeft: "3px", color: "#0174BE" }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/* Icons */}
        <Typography
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Share this post on:
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <IconButton onClick={openInstagram} sx={{ marginRight: "5px" }}>
              <img
                src="/instagram.png"
                alt="Instagram"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
            <IconButton onClick={openFacebook} sx={{ marginLeft: "5px" }}>
              <img
                src="/facebook.png"
                alt="Facebook"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
            <IconButton onClick={openTwitter} sx={{ marginLeft: "5px" }}>
              <img
                src="/twitter.svg"
                alt="Twitter"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
            <IconButton onClick={openMail} sx={{ marginLeft: "5px" }}>
              <img
                src="/mail.svg"
                alt="Mail"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Box>
          <Button onClick={copyLinkToClipboard}>Copy Link to Clipboard</Button>
        </Typography>
      </Popover>

      {/* Instructions Dialog */}
      <Dialog open={openInstructions} onClose={handleDialogClose}>
        <DialogTitle>Instructions</DialogTitle>
        <DialogContent>
          <Typography>
            After clicking &quot;OK,&quot; a new tab will open with your
            selected social media platform. Please log in and paste the link
            into your story or a direct message.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOpenSocialMedia} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const PostPage = ({ params }) => {
  const [isClient, setIsClient] = useState(false);
  const authUser1 = useRequireAuth();
  const [post, setPost] = useState({
    title: "",
    description: "",
    imageURL: "",
    userID: "",
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImg] = useState("");
  const [userID, setUserID] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setIsClient(true);
    async function fetchData() {
      const data = await getDocumentById("posts", params.postId);
      setTitle(data.title);
      setDesc(data.description);
      setImg(data.imageURL);
      setUserID(data.userID);
      setLocation(data.location || "Location not provided");

      // Call functions to ser correct formatting of the date and time
      const postDate = data.timestamp.toDate();
      setDate(postDate.toLocaleDateString());
      setTime(
        postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      // Parse the author's username using the userID
      const userId = data.userID;
      if (userId) {
        const userRef = doc(firestore, "users", userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userInfo = userSnapshot.data();
          setAuthor(userInfo.username);
        } else {
          console.log("Error: User not found in database");
        }
      }
    }
    fetchData();
  }, []);

  if (!isClient || !authUser1) return null;
  return (
    <div>
      <Box
        sx={{
          bgcolor: "#0174BE",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      ></Box>
      <Navbar />
      {/* background */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{ height: "auto", bgcolor: "#fff0ce", position: "absolute" }}
      >
        {/* tags */}
        <Box className={styles.tagGroup}>
          <LFtag tagName={"LOST"} />
          <Tag tagName={"tag 1"} />
          <Tag tagName={"tag 2"} />
          <Tag tagName={"tag 3"} />
          <Tag tagName={"tagtagtagtagtagtag"} />
        </Box>

        <Box
          sx={{
            width: 0.75,
            height: "100%",
            bgcolor: "#fcf7ed",
            margin: "auto",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightgray",
          }}
        >
          {/* Post Body */}
          <Box sx={{ bgcolor: "white", borderRadius: "20px" }}>
            {/* go back */}
            <Link href={`/forum`}>
              <IconButton>
                <ArrowBackIosNewIcon sx={{ color: "gray", margin: "3px" }} />
              </IconButton>
            </Link>
            {/* post body */}
            <Box
              sx={{
                width: 0.8,
                margin: "auto",
              }}
            >
              {/* title + contact */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  marginBottom: "10px",
                }}
              >
                <Box sx={{ maxWidth: "80%" }}>
                  <h1 className={styles.title}>{title}</h1>
                </Box>
                <Link
                  href={`/forum/contact/${params.postId}`}
                  sx={{ bgcolor: "#0174BE", height: "50px" }}
                >
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#0174BE", height: "50px" }}
                  >
                    Contact
                  </Button>
                </Link>
              </Box>

              {/* paragraph + img */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "200px",
                }}
              >
                <Box
                  sx={{
                    maxWidth: 0.5,
                    overflow: "auto",
                    wordWrap: "break-word",
                  }}
                >
                  <p>{desc}</p>
                </Box>
                <Box
                  sx={{
                    maxWidth: 0.5,
                    maxHeight: 0.5,
                    width: "300px",
                    height: "auto",
                    marginLeft: "5px",
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="img"
                      style={{
                        width: "100%", // Makes the image stretch to the full width of the box
                        height: "100%", // Fills the height of the box
                        objectFit: "contain", // Ensures the whole image fits inside the box without cropping
                      }}
                    />
                  ) : (
                    <p>No image to display</p>
                  )}
                </Box>
              </Box>

              {/* author + time */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                }}
              >
                <Box sx={{ display: "flex", gap: "7.5px" }}>
                  <Box
                    sx={{
                      height: "30px",
                      width: "30px",
                      bgcolor: "#FFC436",
                      borderRadius: "10px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {/* profile img here */}
                  </Box>
                  <Link
                    href={`/profile/${author}`}
                    sx={{
                      alignSelf: "flex-end",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {author || "Unknown Author"}
                  </Link>
                </Box>
                <Box
                  sx={{
                    alignSelf: "flex-end",
                    fontSize: "small",
                    color: "gray",
                  }}
                >
                  {date} {time}
                </Box>
              </Box>

              <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

              {/* location + report + share */}
              <Box
                sx={{
                  paddingBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ color: "#0174BE" }} />
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {location || "Location not specified"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <FlagIcon sx={{ paddingRight: "3px", color: "#0174BE" }} />
                  </IconButton>
                  {/* Share button which has a popout panel so it calls a seprate component */}
                  <Box>
                    <ShareButton />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Comment List */}
          <CommentList />

          {/* Comment Box */}
          <Box className={styles.commentBoxContainer}>
            <form className={styles.commentForm} method="get">
              <IconButton>
                <AddIcon sx={{ color: "#0174BE" }} />
              </IconButton>
              <input
                className={styles.commentBox}
                type="text"
                placeholder="Comment"
              />
              <IconButton>
                <SendIcon sx={{ color: "#0174BE" }} />
              </IconButton>
            </form>
          </Box>
          <TopBtn />
        </Box>
      </Container>
    </div>
  );
};

export default PostPage;
