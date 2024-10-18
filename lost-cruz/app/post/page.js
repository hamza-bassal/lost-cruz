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
                <Box sx={{ height: '75px', width: '75px', bgcolor: '#FFC436', borderRadius: '10px' }}></Box>
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

const postPage = () => {
    return (
        <div>
            <Navbar />
            {/* background */}
            <Container maxWidth={false} disableGutters sx={{ height: 'auto', bgcolor: '#fff0ce' }}>
                <Box sx={{ width: 0.75, height: '100%', bgcolor: '#fcf7ed', margin: 'auto' }}>

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
                                paddingBottom: '20px'
                            }}>
                                <h1 style={{ color: '#0C356A' }}>Title</h1>
                                <Button variant="contained" sx={{ bgcolor: "#0174BE" }}>Contact</Button>
                            </Box>

                            {/* paragraph + img */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                minHeight: '200px'
                            }}>
                                <Box sx={{ maxWidth: 0.5, overflow: 'auto', wordWrap: 'break-word' }}>
                                    <p>paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...paragraph...</p>
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
                                    <Box sx={{ height: '30px', width: '30px', bgcolor: '#FFC436', borderRadius: '10px', marginLeft: '10px' }}>
                                        {/* profile img here */}
                                    </Box>
                                    <Link href="#" sx={{ alignSelf: 'flex-end', textDecoration: 'none', color: 'black' }}>author</Link>
                                </Box>
                                <Box sx={{ alignSelf: 'flex-end', fontSize: 'small', color: 'gray' }}>hh:mm a/pm - MM/DD/YYYY</Box>
                            </Box>

                            <hr style={{marginTop: '10px', marginBottom: '10px'}} />

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
                    <Box sx={{
                        padding: '10px',
                        width: 0.75,
                        bgcolor: 'white',
                        position: 'fixed',
                        bottom: '20px',
                        height: '50px',
                        borderRadius: '20px',
                        borderColor: '#0174BE',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        display: 'flex'
                    }}>
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