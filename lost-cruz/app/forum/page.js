// This is the home page where it displays all the uploaded posts.

"use client";
import { Container, Box, Link, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  deleteDoc,
  getDoc,
  where,
} from "firebase/firestore";

import { orderBy, limit } from "firebase/firestore";

import styles from "./forum.module.css";

import Navbar from "../components/navbar/Navbar";
import TopBtn from "../components/topBtn/TopBtn";
import AddBtn from "../components/addBtn/AddBtn";

import { useRequireAuth } from "../hooks/useRequireAuth";

const LFTag = ({ tag }) => {
  // Lost / Found
  return (
    <Box className={styles.LFTag}>
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {tag}
      </Box>
    </Box>
  );
};

const Tag = ({ tag }) => {
  return (
    <Box className={styles.tag}>
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {tag}
      </Box>
    </Box>
  );
};

const Post = ({ postId, title, description, tags, imageURL, lostOrFound }) => {
  const tagsSlice = tags.slice(0, 5);
  return (
    <Box className={styles.singlePost}>
      <Box className={styles.postContent}>
        <Box className={styles.postText}>
          {/* title + description */}
          <Box>
            <Box className={styles.titleBox}>
              <Link
                href={`/forum/${postId}`}
                sx={{
                  width: "inherit",
                  textDecoration: "none",
                  fontSize: "1.8em",
                  fontWeight: "bold",
                  color: "#0C356A",
                  whiteSpace: "nowrap",
                  "@media screen and (max-width: 640px)": {
                    fontSize: "1.3em",
                    "@supports (-webkit-line-clamp: 2)": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "initial",
                      display: "-webkit-box",
                      "-webkit-line-clamp": "2",
                      "-webkit-box-orient": "vertical",
                    },
                  },
                }}
                id="title"
              >
                {title}
              </Link>
            </Box>
            <Box
              className={styles.description}
              sx={{
                color: "#313b40",
              }}
            >
              {description}
            </Box>
          </Box>
          {/* tags */}
          <Box
            sx={{
              margin: "10px",
              marginBottom: "5px",
              width: "100%",
              overflowX: "scroll",
              scrollbarWidth: "none",
              display: "flex",
              gap: "10px",
            }}
          >
            <LFTag tag={lostOrFound} />
            {tagsSlice.map((tag, index) => (
              <Tag key={tag || index} tag={tag} />
            ))}
          </Box>
        </Box>
        {/* image(s) */}
        <Box className={styles.imgContainer}>
          {/* img here */}
          {imageURL ? (
            <img
              src={imageURL}
              alt="img"
              style={{
                width: "100%", // Makes the image stretch to the full width of the box
                height: "auto", // Fills the height of the box
                objectFit: "contain", // Ensures the whole image fits inside the box without cropping
                borderRadius: "10px",
              }}
            />
          ) : (
            <p>No image to display</p>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const ForumPage = () => {
  const [searchTerms, setSearch] = useState([]);
  const [lostOrFound, setStatus] = useState(["LOST", "FOUND"]);
  const [searchBarTerm, setSearchBarTerm] = useState("");

  // brought posts list into forum page to keep setSearch within scope of site rendering, this is for both searching and filtering using tags
  const PostList = () => {
    const [posts, setPosts] = useState([]);

    const updatePosts = async () => {
      let postsQuery;
      console.log("inside updatePosts");
      if (searchBarTerm == "") {
        if (searchTerms.length == 0 && lostOrFound.length == 2) {
          // If both searchTerms and lostOrFound are empty, return all posts
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc")
          );
        } else if (searchTerms.length > 0 && lostOrFound.length < 2) {
          // If both searchTerms and lostOrFound have values, filter by both
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("tags", "array-contains-any", searchTerms),
            where("lostOrFound", "==", lostOrFound[0])
          );
        } else if (searchTerms.length > 0) {
          // If only searchTerms have values, filter by tags
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("tags", "array-contains-any", searchTerms)
          );
        } else if (lostOrFound.length != 0) {
          // If only lostOrFound has a value, filter by lostOrFound
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("lostOrFound", "==", lostOrFound[0])
          );
        }
      } else {
        if (searchTerms.length == 0 && lostOrFound.length == 2) {
          // If both searchTerms and lostOrFound are empty, return posts based on search
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("title", "==", searchBarTerm)
          );
        } else if (searchTerms.length > 0 && lostOrFound.length < 2) {
          // If both searchTerms and lostOrFound have values, filter by both
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("tags", "array-contains-any", searchTerms),
            where("lostOrFound", "==", lostOrFound[0]),
            where("title", "==", searchBarTerm)
          );
        } else if (searchTerms.length > 0) {
          // If only searchTerms have values, filter by tags
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("tags", "array-contains-any", searchTerms),
            where("title", "==", searchBarTerm)
          );
        } else if (lostOrFound.length != 0) {
          // If only lostOrFound has a value, filter by lostOrFound
          postsQuery = query(
            collection(firestore, "posts"),
            orderBy("timestamp", "desc"),
            where("lostOrFound", "==", lostOrFound[0]),
            where("title", "==", searchBarTerm)
          );
        }
      }

      const docs = await getDocs(postsQuery);
      const postsList = [];
      docs.forEach((doc) => {
        postsList.push({ postID: doc.id, ...doc.data() });
      });
      setPosts(postsList);
      console.log("updated posts");
    };

    useEffect(() => {
      updatePosts();
    }, [searchTerms, lostOrFound]);

    /* Pagination */
    const pageSize = 10; // Num of posts show on a single page
    const numPage = Math.ceil(posts.length / pageSize);
    const [pagi, setPagi] = useState({
      count: 0,
      from: 0,
      to: pageSize,
    });
    useEffect(() => {
      setPagi({ ...pagi, count: numPage });
    }, []);
    const currentData = posts.slice(pagi.from, pagi.to);
    const handlePageChange = (e, page) => {
      const from = (page - 1) * pageSize;
      const to = (page - 1) * pageSize + pageSize;
      setPagi({ ...pagi, from: from, to: to });
      window.scroll(0, 0);
    };

    /*
        This is where information retrieval to create new posts will be done. 
        We can limit the amount of posts with a modulo function.
        Current set-up for sprint 1 should just be that it displays the most
        recents posts within in the database.

        Things needed:
        - ID retrieval from storage for link generation to its specific page
            - This will then be used for information retrieval
        */
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* // Box or wrapper around the posts */}
        <Box className={styles.postListContainer}>
          {" "}
          {/* You can apply a class for styling */}
          {/* {post}  Render the array of Post components inside the box */}
          {/* instead of rendering all the posts at once, only show data on the current page */}
          {currentData.map(
            ({ postID, title, description, imageURL, lostOrFound, tags }) => (
              <Post
                key={postID}
                postId={postID} // Unique key for each post
                title={title} // Unique title for each post
                description={description}
                tags={tags}
                imageURL={imageURL}
                lostOrFound={lostOrFound}
              />
            )
          )}
        </Box>
        <Pagination
          count={numPage}
          color="primary"
          onChange={handlePageChange}
          sx={{ margin: "20px 0px" }}
        />
      </Box>
    );
  };

  const [isClient, setIsClient] = useState(false);
  const authUser1 = useRequireAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !authUser1) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: "#0174BE" }}>
      <Box
        sx={{
          bgcolor: "#0174BE",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      ></Box>

      {/* sends setSearch to navbar to update search terms in filters */}
      <Navbar
        setSearch={setSearch}
        setLostStatus={setStatus}
        isForum={true}
        setSearchBarTerm={setSearchBarTerm}
      ></Navbar>
      {/* background */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{ height: "auto", bgcolor: "#fff0ce", position: "absolute" }}
      >
        <Box className={styles.background}>
          {/* post List */}
          <PostList />

          {/* add new post */}
          <Link href={`/createPost`}>
            <AddBtn />
          </Link>

          {/* go back to top */}
          <TopBtn />
        </Box>
      </Container>
    </Box>
  );
};

export default ForumPage;
