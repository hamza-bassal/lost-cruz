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
  TextField,
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
import { doc, getDoc, getDocs } from "firebase/firestore";
import useAuthStore from "@/app/store/authStore";
import {
  createCommentFromPost,
  createCommentFromComment,
  getCommentQueryFromParent,
  getCommentQueryFromParentCuston,
  getCommentFromParent,
  deleteCommentFromPost,
  deleteCommentFromComment,
  isUserOwnerOfComment
} from "@/app/comment_function";

import styles from "./post.module.css";

import Navbar from "../../components/navbar/Navbar";
import TopBtn from "../../components/topBtn/TopBtn";

import { useRequireAuth } from "../../hooks/useRequireAuth";

const SingleComment = ({ commentID, creatorId, content, childComment, timestamp }) => {
  const time = timestamp.toDate().toLocaleDateString([], { hour: "2-digit", minute: "2-digit" });
  const [username, setUsername] = useState("unknown_user");
  useEffect(() => {
    async function getUsername() {
      if (creatorId) {
        const userRef = doc(firestore, "users", creatorId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userInfo = userSnapshot.data();
          setUsername(userInfo.username);
        } else {
          console.log("Error: User not found in database");
        }
      }
    }
    getUsername();
  }, []);

  const authUser = useAuthStore((state) => state.user);
  const [commentToComment, setCommentToComment] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const uploadCommentToComment = async () => {
    setUploading(true);

    // create comment to comment
    createCommentFromComment(commentID, authUser.uid, commentContent);
    // Reset form fields after submission
    setCommentContent("");
    setCommentToComment(false);
    document.getElementById("replyInput").value = "";
    alert("Comment sent successfully!")
    setUploading(false);
  }


  // Load comments to comment
  const [commentList, setCommentList] = useState([]);
  const updateComments = async () => {
    const comments = [];
    for (const id in childComment) {
      const ref = doc(firestore, 'comments', childComment[id]);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        comments.push({ commentID: childComment[id], ...snapshot.data() });
      }
    }
    setCommentList(comments);
  }

  useEffect(() => {
    updateComments();
  }, );


  return (
    <Box>
      <Box className={styles.commentContainer}>
        {/* if screen width greater than 640px (pc)
            show the big profile img and username outside the comment box */}
        {<Box className={styles.commentProf}>
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

          <Box
            sx={{
              width: 'inherit',
              textDecoration: "none",
              wordwrap: "break-word",
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textAlign: 'center',
            }}>
            {username}
          </Box>
        </Box>
        }

        <Box className={styles.commentText}>
          <Box
            sx={{
              overflow: "auto",
              wordWrap: "break-word",
              marginBottom: "20px",
              padding: "2%"
            }}
          >
            {content}
          </Box>

          {/* if screen width less than 640px (mobile)
          show the small profile img and username inside the comment box */}
          <Box className={styles.mobileCommentProf}>
            <Box
              sx={{
                height: "30px",
                width: "30px",
                bgcolor: "#FFC436",
                borderRadius: "10px",
              }}
            >
              {/* profile img here */}
            </Box>
            <Box className={styles.username}>
              {username}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ alignSelf: "center", fontSize: "small", color: "gray" }}>
              {time}
            </Box>
            <IconButton onClick={() => { setCommentToComment(prev => !prev) }}>
              <CommentIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* comment to comment */}
      {commentToComment &&
        <Box className={styles.replyInput}>
          <Box className={styles.replyInputBox}>
            <form className={styles.replyInputForm} method="get">
              <TextField
                variant="standard"
                fullWidth
                multiline
                rows={5}
                id="replyInput"
                placeholder="Comment"
                InputProps={{ disableUnderline: true }}
                sx={{
                  bgcolor: "white"
                }}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <IconButton
                onClick={uploadCommentToComment}
                disabled={uploading || commentContent === ""}
                sx={{ alignSelf: 'flex-start' }}
              >
                <SendIcon sx={!(uploading || commentContent === "") && { color: "#0174BE" }} />
              </IconButton>
            </form>
          </Box>
        </Box>}
      {
        commentList.map(({ commentID, creatorId, content, childComment, timestamp }) => (
          <SubComment
            key={commentID}
            commentID={commentID}
            creatorId={creatorId}
            content={content}
            childComment={childComment}
            timestamp={timestamp}
          />
        ))
      }
    </Box>
  );
};

const SubComment = ({ commentID, creatorId, content, childComment, timestamp }) => {
  const time = timestamp.toDate().toLocaleDateString([], { hour: "2-digit", minute: "2-digit" });
  const [username, setUsername] = useState("unknown_user");
  useEffect(() => {
    async function getUsername() {
      if (creatorId) {
        const userRef = doc(firestore, "users", creatorId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userInfo = userSnapshot.data();
          setUsername(userInfo.username);
        } else {
          console.log("Error: User not found in database");
        }
      }
    }
    getUsername();
  }, []);

  return (
    <Box className={styles.replyInput}>
      <Box className={styles.replyInputBox}>
        <Box
          sx={{
            overflow: "auto",
            wordWrap: "break-word",
            marginBottom: "20px",
            padding: "2%"
          }}
        >
          {content}
        </Box>

        {/* if screen width less than 640px (mobile)
          show the small profile img and username inside the comment box */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: '3%' }}>
            <Box
              sx={{
                height: "30px",
                width: "30px",
                bgcolor: "#FFC436",
                borderRadius: "10px",
              }}
            >
              {/* profile img here */}
            </Box>
            <Box className={styles.username}>
              {username}
            </Box>
          </Box>
          <Box sx={{ alignSelf: 'flex-end', fontSize: "small", color: "gray" }}>
            {time}
          </Box>
        </Box>
      </Box>
    </Box>
  )
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

const CommentList = ({ postId }) => {
  const [postComments, setPostComments] = useState([]);

  const updatePostComments = async () => {
    const commentList = await getCommentFromParent(postId);
    setPostComments(commentList);
  }

  useEffect(() => {
    updatePostComments();
  }, [postComments]);

  return (
    <Box>
      <Box>
        {postComments.map(({ commentID, creatorId, content, childComment, timestamp }) => (
          <SingleComment
            key={commentID}
            commentID={commentID}
            creatorId={creatorId}
            content={content}
            childComment={childComment}
            timestamp={timestamp}
          />
        ))}

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

const MobileLFtag = ({ tagName }) => {
  return (
    <Box className={styles.mobileLFtag}>
      <Box>{tagName}</Box>
    </Box>
  );
}

const MobileTag = ({ tagName }) => {
  return (
    <Box className={styles.mobiletag}>
      <Box sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>{tagName}</Box>
    </Box>
  );
}

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
          window.location.href,
        )}`,
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
          window.location.href,
        )}`,
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
        tweetText,
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
      subject,
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
  const authUser = useAuthStore((state) => state.user);
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
  const [lostOrFound, setStatus] = useState("LOST");
  const [tags, setTags] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    setIsClient(true);
    async function fetchData() {
      const data = await getDocumentById("posts", params.postId);
      setTitle(data.title);
      setDesc(data.description);
      setImg(data.imageURL);
      setUserID(data.userID);
      setLocation(data.location || "Location not provided");
      setStatus(data.lostOrFound)
      setTags(data.tags)

      // Call functions to ser correct formatting of the date and time
      const postDate = data.timestamp.toDate();
      setDate(postDate.toLocaleDateString());
      setTime(
        postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

  const uploadCommentToPost = async () => {
    setUploading(true);

    // create comment to post
    createCommentFromPost(params.postId, authUser.uid, commentContent);

    // Reset form fields after submission
    setCommentContent("");
    document.getElementById("commentInput").value = "";
    alert("Comment sent successfully!")
    setUploading(false);
  }

  if (!isClient || !authUser1) return null;

  const tagsSlice = tags.slice(0, 5);
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
        {/* Retrieves the first 5 tags and displays them accordingly */}
        {(screen.width > 640) &&
          <Box className={styles.tagGroup}>
            <LFtag tagName={lostOrFound} />
            {tagsSlice.map((tag, index) => (
              <Tag key={tag || index} tagName={tag} />
            ))}
          </Box>
        }

        <Box
          className={styles.background}
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
              <Box className={styles.titleBox}>
                <Box sx={{ maxWidth: "80%" }}>
                  <h1 className={styles.title}>{title}</h1>
                </Box>
                <Link
                  href={`/forum/contact/${params.postId}`}
                  sx={{ bgcolor: "#0174BE", height: "50px" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#0174BE", height: "50px",
                      '@media screen and (max-width: 640px)': {
                        height: '5%'
                      },
                    }}
                  >
                    Contact
                  </Button>
                </Link>
              </Box>

              {/* paragraph + img */}
              <Box className={styles.postContainer}>
                <Box className={styles.postDesc}>
                  <p>{desc}</p>
                </Box>
                <Box className={styles.postImg}>
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

              {/* Tags for mobile */}
              {(screen.width <= 640) &&
                <Box sx={{
                  display: 'flex',
                  marginTop: '5%',
                  gap: '2%',
                  width: '100%',
                  overflowX: 'scroll',
                  scrollbarWidth: 'none'
                }}>
                  <MobileLFtag tagName={lostOrFound} />
                  {tagsSlice.map((tag, index) => (
                    <MobileTag key={tag || index} tagName={tag} />
                  ))}
                </Box>
              }

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
                  <Box className={styles.username}>
                    {author || "Unknown Author"}
                  </Box>
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
          <CommentList
            postId={params.postId}
          />

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
                id="commentInput"
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <IconButton
                onClick={uploadCommentToPost}
                disabled={uploading || commentContent === ""}
              >
                <SendIcon sx={!(uploading || commentContent === "") && { color: "#0174BE" }} />
              </IconButton>
            </form>
          </Box>
          {(screen.width > 640) && <TopBtn />}
        </Box>
      </Container>
    </div>
  );
};

export default PostPage;