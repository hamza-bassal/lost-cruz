'use client'

import { Box, IconButton, TextField, FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArticleIcon from '@mui/icons-material/Article';
import { serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { firestore } from '@/firebase'
import { ClickAwayListener } from '@mui/material';
import {
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
  } from 'firebase/firestore'

import styles from "./createPost.module.css"
//import {db} from "lost-cruz\lost-cruz\firebase.js"

const createPost = () => {

    const [postTitle, setTitle] = useState('')
    const [postBody, setBody] = useState('')
    const [postEmail, setEmail] = useState('')
    const [postTag, setTags] = useState([])
    const [postStatus, setStatus] = useState('')

    const createPost = async (the_post) => {
        const docRef = addDoc(collection(firestore, 'posts'), 
        {
            title: postTitle,
            description: postBody,
            email: postEmail,
            tags: postTag,
            status: postStatus,
            timestamp: serverTimestamp()
        });
        console.log(docRef.id);
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white'
        }}>
            {/* close + send */}
            <Box className={styles.closeSend}>
                <IconButton sx={{ color: '#0174BE' }}>
                    <CloseIcon fontSize="large" />
                </IconButton>

                <IconButton sx={{ color: '#FFC436' }}
                onClick={() => {
                    // console.log("Work now")
                    createPost()
                }}>
                    <SendIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* post content */}
            <FormControl
                component="form"
                sx={{
                    width: '100%',
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {/* title */}
                <TextField required fullWidth multiline id="title" variant="standard" placeholder="Title"
                    InputProps={{ style: { fontSize: 30 } }}
                    InputLabelProps={{ style: { fontSize: 30 } }}
                    sx={{
                        alignSelf: 'center',
                        padding: '20px',
                        paddingLeft: '7.5%',
                        paddingRight: '7.5%',
                    }}
                    value={postTitle}
                    onChange={(e) => setTitle(e.target.value)}
                ></TextField>

                {/* post body */}
                <TextField fullWidth multiline rows={15} id="description" placeholder="Description"
                    InputProps={{ style: { fontSize: 20 } }}
                    value={postBody}
                    onChange={(e) => setBody(e.target.value)}
                    sx={{
                        alignSelf: 'center',
                        padding: '20px',
                        paddingLeft: '7.5%',
                        paddingRight: '7.5%',
                    }}>
                </TextField>

                {/* Email */}
                <Box className={styles.inputBox}>
                    <label>Email Address: </label>
                    <TextField id="email" required variant="standard" fullWidth placeholder="email" value={postEmail} onChange={(e) => setEmail(e.target.value)}></TextField>
                </Box>
                
                {/* Tags */}
                <Box className={styles.inputBox} sx={{ gap: '30px' }}>
                    <label>Tags: </label>
                    <TextField id="tags" required variant="standard" fullWidth placeholder="tags" value={postTag} onChange={(e) => setTags(e.target.value)}></TextField>
                </Box>

                {/* Lost or Found */}
                <RadioGroup defaultValue="LOST" row
                    sx={{
                        padding: '20px',
                        paddingLeft: '7.5%',
                        paddingRight: '7.5%',
                        gap: '20px',
                    }}
                    value={postStatus} 
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <FormControlLabel value="LOST" control={<Radio />} label="LOST" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}></FormControlLabel>
                    <FormControlLabel value="FOUND" control={<Radio />} label="FOUND" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}></FormControlLabel>
                </RadioGroup>
            </FormControl>

            <Box sx={{ height: '60px' }}></Box>

            {/* Tools */}
            <Box className={styles.toolBox}>
                {/* Add image */}
                <IconButton>
                    <AddIcon className={styles.icon} />
                </IconButton>

                {/* Add Location */}
                <IconButton>
                    <AddLocationIcon className={styles.icon} />
                </IconButton>

                {/* Save to draft */}
                <IconButton>
                    <ArticleIcon className={styles.icon} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default createPost