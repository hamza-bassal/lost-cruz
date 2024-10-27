'use client'
// individual post
import { Container, Box, Button, Link, IconButton } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from "react";
import { firestore } from '@/firebase'
import { doc, getDoc,} from 'firebase/firestore'

import styles from "./post.module.css"

import Navbar from "../../components/navbar/Navbar"
import TopBtn from "../../components/topBtn/TopBtn"

const SingleComment = () => {
    return (
        <Box className={styles.commentContainer}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                <Box sx={{ height: '75px', width: '75px', bgcolor: '#FFC436', borderRadius: '10px', cursor: 'pointer' }}>
                    {/* User Profile img here */}
                </Box>
                <Link href="#" sx={{ textDecoration: 'none', color: 'black' }}>username</Link>
            </Box>

            <Box className={styles.commentText}>
                <Box sx={{ overflow: 'auto', wordWrap: 'break-word', marginBottom: '20px' }}>
                    <p>paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...</p>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ alignSelf: 'center', fontSize: 'small', color: 'gray' }}>hh:mm a/pm - MM/DD/YYYY</Box>
                    <IconButton><CommentIcon sx={{ fontSize: '20px' }} /></IconButton>
                </Box>

            </Box>
        </Box>
    )
}


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
                <hr style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px', borderTop: 'dotted', color: 'lightgray', borderWidth: '3px' }} />
            </Box>
            <Box sx={{ height: '100px', width: 'auto' }}></Box>
        </Box>
    )
}

const LFtag = ({ tagName }) => {
    return (
        <box className={styles.lfTag}>
            <box className={styles.tagText}>{tagName}</box>
        </box>
    )
}

const Tag = ({ tagName }) => {
    return (
        <box className={styles.tag}>
            <box className={styles.tagText}>{tagName}</box>
        </box>
    )
}

const postPage = ( {params} ) => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [imageUrl, setImg] = useState("")

    useEffect(() => {
        async function fetchData() {
          const data = await getDocumentById('posts', params.postId);
          setTitle(data.title);
          setDesc(data.description)
          setImg(data.imageURL)
        }
    
        fetchData();
      }, []);

    return (
        <div>
            <Box sx={{bgcolor: '#0174BE', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-around',}}></Box>
            <Navbar />
            {/* background */}
            <Container maxWidth={false} disableGutters sx={{ height: 'auto', bgcolor: '#fff0ce' }}>

                {/* tags */}
                <Box className={styles.tagGroup}>
                    <LFtag tagName={"LOST"} />
                    <Tag tagName={"tag 1"} />
                    <Tag tagName={"tag 2"} />
                    <Tag tagName={"tag 3"} />
                    <Tag tagName={"tagtagtagtagtagtag"} />
                </Box>

                <Box sx={{ width: 0.75, height: '100%', bgcolor: '#fcf7ed', margin: 'auto', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
                    {/* Post Body */}
                    <Box sx={{ bgcolor: 'white', borderRadius: '20px' }}>
                        {/* go back */}
                        <Link href={`/forum`}>
                            <IconButton>
                                <ArrowBackIosNewIcon sx={{ color: 'gray', margin: '3px' }} />
                            </IconButton>
                        </Link>
                        {/* post body */}
                        <Box sx={{
                            width: 0.8,
                            margin: 'auto'
                        }}>

                            {/* title + contact */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                marginBottom: '10px',
                            }}>
                                <Box sx={{ maxWidth: '80%', }}>
                                    <h1 className={styles.title}>{title}</h1>
                                </Box>
                                <Link href={`/forum/contact/${params.postId}`} sx={{ bgcolor: "#0174BE", height: '50px' }}>
                                    <Button variant="contained" sx={{ bgcolor: "#0174BE", height: '50px' }}>Contact</Button>
                                </Link>
                            </Box>

                            {/* paragraph + img */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                minHeight: '200px'
                            }}>
                                <Box sx={{ maxWidth: 0.5, overflow: 'auto', wordWrap: 'break-word' }}>
                                    <p>{desc}</p>
                                </Box>
                                <Box sx={{ maxWidth: 0.5, maxHeight: 0.5, bgcolor: '#FFC436', width: '300px', height: '350px', marginLeft: '5px' }}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="img" 
                                            style={{ 
                                            width: '100%',  // Makes the image stretch to the full width of the box
                                            height: '100%',  // Fills the height of the box
                                            objectFit: 'contain'  // Ensures the whole image fits inside the box without cropping
                                        }} />
                                    ) : (
                                        <p>No image to display</p>
                                    )}
                                </Box>
                            </Box>

                            {/* author + time */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '10px',
                                paddingTop: '20px',
                                paddingBottom: '10px',
                            }}>
                                <Box sx={{ display: 'flex', gap: '7.5px' }}>
                                    <Box sx={{ height: '30px', width: '30px', bgcolor: '#FFC436', borderRadius: '10px', marginLeft: '10px', cursor: 'pointer' }}>
                                        {/* profile img here */}
                                    </Box>
                                    <Link href="#" sx={{ alignSelf: 'flex-end', textDecoration: 'none', color: 'black' }}>author</Link>
                                </Box>
                                <Box sx={{ alignSelf: 'flex-end', fontSize: 'small', color: 'gray' }}>hh:mm a/pm - MM/DD/YYYY</Box>
                            </Box>

                            <hr style={{ marginTop: '10px', marginBottom: '10px' }} />

                            {/* location + report + share */}
                            <Box sx={{ paddingBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton>
                                        <LocationOnIcon sx={{ color: "#0174BE" }} />
                                    </IconButton>
                                    <Link href="#" variant="body2">location details ...</Link>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <FlagIcon sx={{ paddingRight: '3px', color: '#0174BE', }} />
                                    </IconButton>

                                    <IconButton>
                                        <ShareIcon sx={{ paddingLeft: '3px', color: '#0174BE', }} />
                                    </IconButton>

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
                                <AddIcon sx={{ color: '#0174BE' }} />
                            </IconButton>
                            <input className={styles.commentBox} type="text" placeholder="Comment" />
                            <IconButton>
                                <SendIcon sx={{ color: '#0174BE' }} />
                            </IconButton>
                        </form>
                    </Box>
                    <TopBtn />
                </Box>
            </Container>
        </div>

    )

}

export default postPage