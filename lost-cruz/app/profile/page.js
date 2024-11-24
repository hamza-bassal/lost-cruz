// User profile page

'use client'

import { Box, Container, IconButton, Link } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore"

import NavBar from "../components/navbar/Navbar"
import TopBtn from "../components/topBtn/TopBtn"

import styles from "./profile.module.css"

import { useRequireAuth } from '../hooks/useRequireAuth';

import { removePost } from './post_function';
import { post } from "hooks";


const Profile = () => {
    const [isClient, setIsClient] = useState(false);
    const authUser1 = useRequireAuth();
    useEffect(() => {
        setIsClient(true);
    }, []);

    /* Get current user id + information */
    const auth = getAuth();
    const [userId, setUserId] = useState(""); // current user id
    const [posts, setPosts] = useState([]);   // post list
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateUserProfile(user);
        }
    });
    function updateUserProfile(user) {
        /* get current user id */
        const id = user.uid;
        setUserId(id);
        /* fetch current user info */
        const getUser = async () => {
            const userRef = doc(firestore, 'users', id);
            const userSnapshot = await getDoc(userRef);
            const userInfo = { ...userSnapshot.data() };

            /* Display username, id, profile image*/
            const userName = userInfo.username;
            // const userPic = user.photoURL;
            document.getElementById("userName").textContent = userName;
            // document.getElementById("userId").textContent = id;  // do we have a user id to display?
            // document.getElementById("userPic").src = userPic;

            /* Fetch posts with post id list */
            const postId = (userInfo.posts);
            const postList = [];
            for (const id in postId) {
                const postRef = doc(firestore, 'posts', postId[id]);
                const snapshot = await getDoc(postRef);
                if (snapshot.exists()){  // check if the post exists
                    postList.push({ postID: snapshot.id, ...snapshot.data() });                    
                }
            }
            setPosts(postList);
        }
        getUser();
    }

    if (!isClient || !authUser1) {
        return null;
    }

    /* single post block */
    const Post = ({ postId, title, time }) => {
        return (
            <Box className={styles.post}>
                <Box className={styles.titleTime}>
                    {/* Title */}
                    <Box className={styles.title}>
                        {/* title links to the single post page */}
                        <Link href={`/forum/${postId}`}
                            sx={{ textDecoration: 'none', color: 'black', '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' } }}>
                            {title}
                        </Link>
                    </Box>

                    {/* Time */}
                    <Box sx={{ fontSize: '10px', color: 'gray' }}>{time}</Box>
                </Box>

                {/* edit + delete btns */}
                <Box className={styles.button}>
                    {/* edit post */}
                    <Link href={`/profile/edit/${postId}`}>
                        <IconButton>
                            <EditIcon sx={{ color: '#0174BE' }} />
                        </IconButton>
                    </Link>

                    {/* delete post */}
                    {/*<IconButton onClick={removePost(postId)}>*/}
                    <IconButton onClick={() => { removePost(postId) }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
        )
    }

    return (
        <Box>
            <NavBar />
            {/* background */}
            <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', height: 'auto', bgcolor: '#fff0ce' }}>
                <Box sx={{ width: 0.75, minHeight: '100vh', height: '100%', bgcolor: '#fcf7ed', margin: 'auto', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
                    {/* Leave space for the navbar on the top */}
                    <Box sx={{ height: '50px' }} />

                    {/* user info */}
                    <Box className={styles.userInfo}>
                        {/* profile image */}
                        <Box
                            sx={{
                                width: '150px',
                                height: '150px',
                                bgcolor: '#FFC436',
                                borderRadius: '15px',
                            }}>
                            {/* ----- profile img here ----- */}
                        </Box>

                        <Box sx={{ marginTop: '20px', maxWidth: '50%' }}>
                            {/* username + edit btn */}
                            <Box className={styles.username}>
                                <Box sx={{
                                    margin: '10px',
                                    fontSize: '20px',
                                    width: 'inherit',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}><p id="userName">USERNAME</p></Box>

                                <IconButton>
                                    {/* edit button: change the username */}
                                    <EditIcon sx={{ color: '#0174BE' }} />
                                </IconButton>
                            </Box>

                            <hr style={{ borderTopColor: '#0174BE' }} />

                            {/* user id */}
                            <Box sx={{
                                margin: '10px',
                                color: 'gray',
                                overflow: 'hidden',
                                wordWrap: 'break-word',
                                textOverflow: 'ellipsis',
                            }}><span style={{ display: "inline-flex" }}>@<p id="userId">id...</p></span></Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        paddingLeft: '45px',
                        paddingRight: '45px',
                        paddingTop: '50px',
                        textAlign: 'center',
                        color: 'gray',
                        fontWeight: 'bold',
                        cursor: 'default'
                    }}>My Posts</Box>

                    {/* post lists */}
                    <Box className={styles.postList}>
                        {posts.map(({ postID, title, timestamp }) => (
                            <Post
                                key={postID}
                                postId={postID}
                                title={title}
                                time={timestamp.toDate().toLocaleString()}
                            />
                        ))}

                        <Box className={styles.divider}>end of list</Box>
                    </Box>
                </Box>
            </Container>
            {/* Back to top button */}
            <TopBtn />
        </Box>
    )
}

export default Profile