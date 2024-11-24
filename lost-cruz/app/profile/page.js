// User profile page

'use client'

import { Box, Container, IconButton, Link, Typography, FormGroup, FormControlLabel, Checkbox} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore"

import NavBar from "../components/navbar/Navbar"
import TopBtn from "../components/topBtn/TopBtn"

import styles from "./profile.module.css"

import { useRequireAuth } from '../hooks/useRequireAuth';

import { removePost } from './post_function';
import { tagOptions } from '../data/tagsData';


const Profile = () => {
    const [isClient, setIsClient] = useState(false);
    const [open, setOpen] = useState(false); // watchlist filter
    const authUser1 = useRequireAuth();
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedLostStatus, setSelecLost] = useState([]);


    useEffect(() => {
        setIsClient(true);
    }, []);

    /* Get current user id + information */
    const auth = getAuth();
    const [userId, setUserId] = useState(""); // current user id
    const [posts, setPosts] = useState([]);   // post list

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is authenticated");
                updateUserProfile(user);
            }
        });
    
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []); // Empty dependency array ensures this runs only once

    const handleLostCheckboxChange = (event, status) => {
        const isChecked = event.target.checked;
    
        setSelecLost((statuses) => {
            if (isChecked) {
                return [...statuses, status];  // Add the tag to the selectedTags array
            } else {
                return statuses.filter((exisitngStatus) => exisitngStatus != status);  // Remove the tag
            }
        });
    };

    const updateDigestTags = async() => {
        const userDocRef = doc(firestore, "users", userId);
        await updateDoc(userDocRef, {
          digestTags: selectedTags,
          digestStatus: selectedLostStatus,
        })
    }


    const handleTagCheckboxChange = (event, tag) => {
        const isChecked = event.target.checked;
    
        setSelectedTags((prevTags) => {
            if (isChecked) {
                return [...prevTags, tag];  // Add the tag to the selectedTags array
            } else {
                return prevTags.filter((existingTag) => existingTag != tag);  // Remove the tag
            }
        });
    };

    // Trigger filter when user clicks the "Filter" button
    const handleFilterClick = () => {
        updateDigestTags();
        setOpen(false);
    };

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

            setSelectedTags(userInfo.digestTags);
            setSelecLost(userInfo.digestStatus);

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
                    <Box sx={{ fontSize: '10px', color: 'gray', overflow: 'hidden' }}>{time}</Box>
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

    const MenuBtn = () => {
        return (
            <Box className={styles.dropdown}>
                <Box sx={{
                    width: '200px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '80%',
                            bgcolor: '#0174BE',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setOpen(prev => !prev);
                        }}
                    >
                        <Typography sx={{color: 'white', fontSize: '20px',}}>
                            Posts Preferences
                        </Typography>
                    </Box>
                </Box>

                {open && <Box className={styles.dropdownBox}>
                    <FormGroup row>
                        <FormControlLabel 
                        control={<Checkbox 
                            id="lost-checkbox" // Unique ID
                            name="lostStatus" // Name for form submission
                            checked={selectedLostStatus.includes("LOST")} 
                            onChange={(event) => handleLostCheckboxChange(event, "LOST")}
                            size="small" />} 
                            label="Lost" />
                        <FormControlLabel 
                        control={<Checkbox 
                            id="found-checkbox" // Unique ID
                            name="foundStatus" // Name for form submission
                            checked={selectedLostStatus.includes("FOUND")} 
                            onChange={(event) => handleLostCheckboxChange(event, "FOUND")}
                            size="small" />} 
                            label="Found" />
                    </FormGroup>
                    <hr className={styles.hr} />
                    <FormGroup column>
                        {tagOptions.map((tag, index) => (
                            <FormControlLabel key={tag || index} 
                            control={<Checkbox 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} 
                                id={`tag-checkbox-${index}`} // Unique ID for each tag
                                name={`tag-${tag}`} // Descriptive name for each tag
                                checked={selectedTags.includes(tag)} 
                                onChange={(event) => handleTagCheckboxChange(event, tag)}
                                />} 
                            label={tag} />
                        ))}
                    </FormGroup>
                    <Box sx={{
                        width: '200px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }} 
                        onClick={handleFilterClick} 
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '80%',
                                bgcolor: '#FFC436',
                                borderRadius: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography sx={{color: 'black', fontWeight: 'bold', fontSize: '20px',}}>
                                Apply
                            </Typography>
                        </Box>
                    </Box>
                </Box>}
            </Box>
        )
    }

    return (
        <Box>
            <NavBar />
            {/* background */}
            <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', height: 'auto', bgcolor: '#fff0ce' }}>
                <Box className={styles.background}>
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

                        <Box sx={{ marginTop: '20px', maxWidth: '50%', 
                            '@media screen and (max-width: 640px)': {
                            maxWidth: '100%'
                        } }}>
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
                            }}><span style={{ display: "inline-flex" }}>@<p id="userId">id...</p></span>
                            </Box>
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
                    }}>Select preferred tags to be notified of (5 posts in addition to regular digest posts):</Box>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1em',
                        position: 'relative',
                        padding: '15px',
                    }}>
                        {/* Filter Button */}
                        <MenuBtn />
                    
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