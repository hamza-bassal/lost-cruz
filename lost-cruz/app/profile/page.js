// User profile page

"use client";

import { Box, Container, IconButton, Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import NavBar from "../components/navbar/Navbar";
import TopBtn from "../components/topBtn/TopBtn";

import styles from "./profile.module.css";

const profile = () => {
  // single post block
  const Post = ({ title, time }) => {
    return (
      <Box className={styles.post}>
        <Box className={styles.titleTime}>
          {/* Title */}
          <Box className={styles.title}>
            {/* title links to the single post page */}
            <Link
              href="#"
              sx={{
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                },
              }}
            >
              {title}
            </Link>
          </Box>

          {/* Time */}
          <Box sx={{ fontSize: "10px", color: "gray" }}>{time}</Box>
        </Box>

        {/* edit + delete btns */}
        <Box className={styles.button}>
          {/* edit post */}
          <IconButton>
            <EditIcon sx={{ color: "#0174BE" }} />
          </IconButton>

          {/* delete post */}
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <NavBar />
      {/* background */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{ minHeight: "100vh", height: "auto", bgcolor: "#fff0ce" }}
      >
        <Box
          sx={{
            width: 0.75,
            minHeight: "100vh",
            height: "100%",
            bgcolor: "#fcf7ed",
            margin: "auto",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightgray",
          }}
        >
          {/* Leave space for the navbar on the top */}
          <Box sx={{ height: "50px" }} />

          {/* user info */}
          <Box className={styles.userInfo}>
            {/* profile image */}
            <Box
              sx={{
                width: "150px",
                height: "150px",
                bgcolor: "#FFC436",
                borderRadius: "15px",
              }}
            >
              {/* ----- profile img here ----- */}
            </Box>

            <Box sx={{ marginTop: "20px", maxWidth: "50%" }}>
              {/* username + edit btn */}
              <Box className={styles.username}>
                <Box
                  sx={{
                    margin: "10px",
                    fontSize: "20px",
                    width: "inherit",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  USERNAME
                </Box>

                <IconButton>
                  {/* edit button: change the username */}
                  <EditIcon sx={{ color: "#0174BE" }} />
                </IconButton>
              </Box>

              <hr style={{ borderTopColor: "#0174BE" }} />

              {/* user id */}
              <Box
                sx={{
                  margin: "10px",
                  color: "gray",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  textOverflow: "ellipsis",
                }}
              >
                @id...
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              paddingLeft: "45px",
              paddingRight: "45px",
              paddingTop: "50px",
              textAlign: "center",
              color: "gray",
              fontWeight: "bold",
              cursor: "default",
            }}
          >
            My Posts
          </Box>

          {/* post lists */}
          <Box className={styles.postList}>
            <Post
              title={
                "TITLETITLETITLETITLETITLETITLETITLETITLETITLETITLETITLETITLETITLETITLETITLE"
              }
              time={"Jan 1 2024 01:01:01"}
            />
            <Post title={"TITLE"} time={"Jan 1 2024 01:01:01"} />
            <Post title={"TITLE"} time={"Jan 1 2024 01:01:01"} />
            <Post title={"TITLE"} time={"Jan 1 2024 01:01:01"} />
            <Post title={"TITLE"} time={"Jan 1 2024 01:01:01"} />
            <Post title={"TITLE"} time={"Jan 1 2024 01:01:01"} />

            <Box className={styles.divider}>end of list</Box>
          </Box>
        </Box>
      </Container>
      {/* Back to top button */}
      <TopBtn />
    </Box>
  );
};

export default profile;
