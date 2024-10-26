// This page shows a single post with a comment section. 

'use client'

import { Container, Box, Button, Link, IconButton } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CommentIcon from '@mui/icons-material/Comment';

import styles from "./post.module.css"

import Navbar from "../components/navbar/Navbar"
import TopBtn from "../components/topBtn/TopBtn"

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

const badWords = ["badword1", "badword2", "badword3"]
const contactInfoPatterns = [ /\d{3}-\d{3}-\d{4}/, /\(\d{3}\) \d{3}-\d{4}/, /\d{3} \d{3} \d{4}/, /\d{3}\.\d{3}\.\d{4}/, /\d{3} \d{4} \d{4}/, /\d{3}-\d{4}-\d{4}/, /\d{3}\.\d{4}\.\d{4}/, /\d{3} \d{4} \d{4}/, /\d{3}-\d{3}-\d{3}-\d{3}/, /\d{3}\.\d{3}\.\d{3}\.\d{3}/, /\d{3} \d{3} \d{3} \d{3}/, /\d{3}-\d{4}-\d{4}-\d{4}/, /\d{3}\.\d{4}\.\d{4}\.\d{4}/, /\d{3} \d{4} \d{4} \d{4}/, /\d{3}-\d{3}-\d{3}-\d{3}-\d{3}/, /\d{3}\.\d{3}\.\d{3}\.\d{3}\.\d{3}/, /\d{3} \d{3} \d{3} \d{3} \d{3}/, /\d{3}-\d{4}-\d{4}-\d{4}-\d{4}/, /\d{3}\.\d{4}\.\d{4}\.\d{4}\.\d{4}/, /\d{3} \d{4} \d{4} \d{4} \d{4}/, /\d{3}-\d{3}-\d{3}-\d{3}-\d{3}-\d{3}/, /\d{3}\.\d{3}\.\d{3}\.\d{3}\.\d{3}\.\d{3}/, /\d{3} \d{3} \d{3} \d{3} \d{3} \d{3}/, /\d{1,5}\s[A-Za-z0-9\s]+(?:Ave|Avenue|St|Street|Rd|Road|Blvd|Boulevard|Dr|Drive|Ct|Court|Ln|Lane|Way)\.?/]

function filterText(text){
    let filteredText = text;
    badWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, "gi"); 
        filteredText = filteredText.replace(word, "[REDACTED]");
    });

    contactInfoPatterns.forEach(pattern => {
        filteredText = filteredText.replace(pattern, "[REDACTED]");
    });

    return filteredText;
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

const PostPage = () => {
    const description = "I live at 123 Fake Street. Call me at 123-456-7890. This is a badword1 and badword2 example.";
    const cleanedDescription = filterText(description);
    return (
        <div>
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
                        <IconButton>
                            <ArrowBackIosNewIcon sx={{ color: 'gray', margin: '3px' }} />
                        </IconButton>
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
                                    <h1 className={styles.title}>Item Title</h1>
                                </Box>
                                <Button variant="contained" sx={{ bgcolor: "#0174BE", height: '50px' }}>Contact</Button>
                            </Box>

                            {/* paragraph + img */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                minHeight: '200px'
                            }}>
                                <Box sx={{ maxWidth: 0.5, overflow: 'auto', wordWrap: 'break-word' }}>
                                    <p style={{ color: '#333333' }}>{cleanedDescription}</p>
                                </Box>
                                <Box sx={{ maxWidth: 0.5, maxHeight: 0.5, bgcolor: '#FFC436', width: '300px', height: '350px', marginLeft: '5px' }}>
                                    {/* image(s) here */}
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

const createComment = async () =>
{
    const postsCollection = collection(firestore, "comments");
    await addDoc(postsCollection, {
      commentBody: commentBody,
      commenterID: commentorID,
      commentParentID: parentID,
      
      timestamp: timestamp()
    })
}

export default PostPage