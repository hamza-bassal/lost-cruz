// User profile page

'use client'

import { Box, Container, IconButton, Link, Typography, FormGroup, FormControlLabel, Checkbox, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore"
import {changeUserName, changeFullName, changeProfilePicture, getProfilePicture} from "./profile_function"

import NavBar from "../components/navbar/Navbar"
import TopBtn from "../components/topBtn/TopBtn"

import styles from "./profile.module.css"

import { useRequireAuth } from '../hooks/useRequireAuth';

import { removePost } from './post_function';
import { tagOptions } from '../data/tagsData';


const Profile = () => {
    const [isClient, setIsClient] = useState(false);
    const [open, setOpen] = useState(false); // watchlist filter
    const [editOpen, setEditOpen] = useState(false); // edit box open
    const authUser1 = useRequireAuth();
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedLostStatus, setSelecLost] = useState([]);
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [tempFullName, setTempName] = useState("");
    const [tempUserName, setTempUserName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [file, setFile] = useState(null);


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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


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

    // Trigger filter when user clicks the "Apply" button in MenuBtn
    const handleFilterClick = () => {
        updateDigestTags();
        setOpen(false);
    };

    // Trigger edit when user clicks the "Apply" button in editBox
    const handleEditing = async () => {
        try {
            // Wait for each async operation to complete before proceeding
            await changeFullName(userId, tempFullName);
            await changeUserName(userId, tempUserName);

            if (profilePic != null) {
                await changeProfilePicture(userId, file);

    
                // Update local states and close the editing modal
                setEditOpen(false);
                setFullName(tempFullName);
                setUserName(tempUserName);
        
                // Fetch the updated profile picture URL
                const userRef = doc(firestore,'users',userId);
                const userSnap = await getDoc(userRef);
                const userInfo = { ...userSnap.data() };
                const imgUrl = userInfo.profilePicture;
        
                // Update the profile picture state
                setProfilePic(imgUrl);
            } else {
                setEditOpen(false);
                setFullName(tempFullName);
                setUserName(tempUserName);
            }
        } catch (error) {
            console.error('Error during profile update:', error);
        }
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
            // const userPic = user.photoURL;
            setFullName(userInfo.fullName);
            setUserName(userInfo.username);
            setTempName(userInfo.fullName);
            setTempUserName(userInfo.username);
            setProfilePic(userInfo.profilePicture);
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

    // This being its own seperate component breaks it because the values keep refreshing themselves
    // const EditBox = () => {
    //     return (
    //         <Box className={styles.dropdown}>
    //             {editOpen &&  <Box className={styles.dropdownBox} sx={{top: '10px', width: '450px'}}>
    //                 <Box className={styles.userInfoEdit}>
    //                     {/* profile image */}
    //                     <Box
    //                         sx={{
    //                             width: '150px',
    //                             height: '150px',
    //                             bgcolor: '#FFC436',
    //                             borderRadius: '15px',
    //                         }}>
    //                         {/* ----- profile img here ----- */}
    //                     </Box>

    //                     <Box sx={{ marginTop: '20px', maxWidth: '50%' }}>
    //                         {/* username + edit btn */}
    //                         <Box className={styles.username}>
    //                             <Box
    //                                 sx={{
    //                                     margin: '10px',
    //                                     fontSize: '20px',
    //                                     width: 'inherit',
    //                                     overflow: 'hidden',
    //                                     textOverflow: 'ellipsis',
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     gap: '8px',
    //                                 }}
    //                             >
    //                                 <TextField
    //                                     value={tempFullName}
    //                                     onChange={(e) => setTempName(e.target.value)}
    //                                     variant="outlined"
    //                                     size="small"
    //                                     fullWidth
    //                                 />
    //                             </Box>
    //                         </Box>

    //                         <hr style={{ borderTopColor: '#0174BE' }} />

    //                         {/* user id */}
    //                         <Box sx={{
    //                             color: 'gray',
    //                             overflow: 'hidden',
    //                             wordWrap: 'break-word',
    //                             textOverflow: 'ellipsis',
    //                         }}>
    //                             <Box
    //                                 sx={{
    //                                     margin: '10px',
    //                                     fontSize: '20px',
    //                                     width: 'inherit',
    //                                     overflow: 'hidden',
    //                                     textOverflow: 'ellipsis',
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     gap: '8px',
    //                                 }}
    //                             >
    //                                 <TextField
    //                                     value={tempUserName}
    //                                     onChange={(e) => setTempUserName(e.target.value)}
    //                                     variant="outlined"
    //                                     size="small"
    //                                     fullWidth
    //                                 />
    //                             </Box>
    //                         </Box>

    //                         <Box sx={{
    //                             width: '200px',
    //                             height: '50px',
    //                             display: 'flex',
    //                             justifyContent: 'center',
    //                             alignItems: 'center',
    //                             }} 
    //                             onClick={handleEditing} 
    //                         >
    //                             <Box
    //                                 sx={{
    //                                     width: '100%',
    //                                     height: '80%',
    //                                     bgcolor: '#FFC436',
    //                                     borderRadius: '10px',
    //                                     display: 'flex',
    //                                     justifyContent: 'center',
    //                                     alignItems: 'center',
    //                                     cursor: 'pointer',
    //                                 }}
    //                             >
    //                                 <Typography sx={{color: 'black', fontWeight: 'bold', fontSize: '20px',}}>
    //                                     Apply
    //                                 </Typography>
    //                             </Box>
    //                         </Box>
    //                     </Box>
    //                 </Box>
    //             </Box>}
    //         </Box>
    //     )
    // }

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

    function handleResetPassword() {
        const auth = getAuth();
        const userEmail = auth.currentUser?.email;

        if (!userEmail) {
            alert('No user email found. Please log in again.');
            return;
        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password reset email sent. Check your inbox.');
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                alert("Failed to send password reset email. Please try again later.");
            })
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
                        {profilePic ? ( <Box className={styles.postImg}>
                            <img
                            src={profilePic}
                            alt="img"
                            style={{
                                width: "150px", // Makes the image stretch to the full width of the box
                                height: "150px", // Fills the height of the box
                                objectFit: "contain", // Ensures the whole image fits inside the box without cropping
                                borderRadius: "75px",
                            }}
                            />
                        </Box> ) : (

                        <Box
                            sx={{
                                width: '150px',
                                height: '150px',
                                bgcolor: '#FFC436',
                                borderRadius: '15px',
                            }}>
                            {/* ----- profile img here ----- */}
                        </Box> )}

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
                                }}>{fullName}</Box>
                            </Box>

                            <hr style={{ borderTopColor: '#0174BE' }} />

                            {/* user id */}
                            <Box sx={{
                                margin: '10px',
                                color: 'gray',
                                overflow: 'hidden',
                                wordWrap: 'break-word',
                                textOverflow: 'ellipsis',
                            }}>{userName}</Box>


                            {/* reset password */}
                            <Box sx={{
                                width: '200px',
                                height: '50px',
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '80%',
                                        height: '80%',
                                        bgcolor: '#0174BE',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleResetPassword}
                                >
                                    <Typography sx={{color: 'white', fontSize: '15px',}}>
                                        Reset Password
                                    </Typography>
                                </Box>
                            </Box>

                        </Box>
                        <IconButton onClick={() => setEditOpen(prev => !prev)}>
                            {/* edit button: change the username */}
                            <EditIcon sx={{ color: '#0174BE' }}/>
                        </IconButton>
                    </Box>

                    {/* user info edit*/}
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1em',
                        position: 'relative',
                    }}>
                        <Box className={styles.dropdown}>
                            {editOpen &&  <Box className={styles.dropdownBox} sx={{top: '10px', width: '400px', gap: '5px'}}>
                                <Box className={styles.userInfoEdit}>
                                    
                                    {/* profile image upload */}
                                    <Box
                                        sx={{
                                            marginTop: '0px',
                                            maxWidth: '70%',
                                            display: 'flex',           // Enables Flexbox
                                            flexDirection: 'column',   // Stacks children vertically
                                            alignItems: 'center',      // Centers children horizontally
                                            justifyContent: 'center',  // Centers children vertically
                                            textAlign: 'center',       // Centers text within children (like Typography)
                                        }}
                                    >
                                        <Box className={styles.inputBox}>
                                            <label htmlFor="image-upload">
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
                                        <Typography sx={{color: 'black', fontSize: '15px',}}>
                                            Profile Image
                                        </Typography>
                                    </Box>

                                    <Box sx={{ marginTop: '0px', maxWidth: '70%' }}>
                                        {/* username + edit btn */}
                                        <Box className={styles.username}>
                                            <Box
                                                sx={{
                                                    margin: '10px',
                                                    fontSize: '20px',
                                                    width: 'inherit',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                }}
                                            >
                                                <TextField
                                                    value={tempFullName}
                                                    onChange={(e) => setTempName(e.target.value)}
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                />
                                            </Box>
                                        </Box>

                                        <hr style={{ borderTopColor: '#0174BE' }} />

                                        {/* user id */}
                                        <Box sx={{
                                            color: 'gray',
                                            overflow: 'hidden',
                                            wordWrap: 'break-word',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            <Box
                                                sx={{
                                                    margin: '10px',
                                                    fontSize: '20px',
                                                    width: 'inherit',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                }}
                                            >
                                                <TextField
                                                    value={tempUserName}
                                                    onChange={(e) => setTempUserName(e.target.value)}
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                />
                                            </Box>
                                        </Box>

                                        <Box sx={{
                                            width: 'inherit',
                                            height: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            }} 
                                            onClick={handleEditing} 
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
                                    </Box>
                                </Box>
                            </Box>}
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