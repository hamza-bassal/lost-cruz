'use client'
import { Container, Box, Link } from "@mui/material"

import styles from "./forum.module.css"

import Navbar from "../components/navbar/Navbar"
import TopBtn from "../components/topBtn/TopBtn"
import AddBtn from "../components/addBtn/AddBtn"


const LFTag = ({ tag }) => {
    // Lost / Found
    return (
        <Box
            sx={{
                bgcolor: '#0147BE',
                height: '30px',
                width: 'auto',
                padding: '10px',
                color: 'white',
                fontSize: 'small',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
            }}>
            <Box
                sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}>
                {tag}
            </Box>
        </Box>
    )
}

const Tag = ({ tag }) => {
    return (
        <Box
            sx={{
                bgcolor: '#FFC436',
                height: '30px',
                width: 'auto',
                padding: '10px',
                color: 'white',
                fontSize: 'small',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                maxWidth: '100px',
            }}>
            <Box
                sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}>
                {tag}
            </Box>
        </Box>
    )
}

const Post = ({ title, description, tags, image }) => {
    return (
        <Box className={styles.singlePost}>
            <Box className={styles.postContent}>
                <Box className={styles.postText}>
                    {/* title + description */}
                    <Box>
                        <Box className={styles.titleBox}>
                            <Link href={"#"}
                                sx={{
                                    width: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '1.8em',
                                    fontWeight: 'bold',
                                    color: '#0C356A',
                                    whiteSpace: 'nowrap',
                                }}>{title} </Link>
                        </Box>
                        <Box className={styles.description}>
                            {description}
                        </Box>
                    </Box>
                    {/* tags */}
                    <Box sx={{ margin: '10px', marginBottom: '5px', width: "95%", overflow: 'hidden', display: 'flex', gap: '10px' }}>
                        <LFTag tag={'LOST'} />
                        <Tag tag={'tag1'} />
                        <Tag tag={'tag2'} />
                        <Tag tag={'tag3'} />
                        <Tag tag={'tag4'} />
                        <Tag tag={'tagtagtagtagtagtagtag'} />
                    </Box>
                </Box>
                {/* image(s) */}
                <Box sx={{ width: '200px', height: 'auto', bgcolor: '#FFC436', margin: '10px' }}>
                    {/* img here */}
                </Box>
            </Box>
        </Box>
    )
}

const PostList = () => {
    return (
        <Box className={styles.postListContainer}>
            <Post
                title={'Title'}
                description={'description'}
                tags={[]}
                image={'...'}
            />
            <Post
                title={'Title'}
                description={'description'}
                tags={[]}
                image={'...'}
            />
            <Post
                title={'Title'}
                description={'description'}
                tags={[]}
                image={'...'}
            />
            <Post
                title={'Title'}
                description={'description'}
                tags={[]}
                image={'...'}
            />
            <Post
                title={'Title'}
                description={'description'}
                tags={[]}
                image={'...'}
            />
            <Post
                title={'Title'}
                description={'description'}
                tags={[]}
                image={'...'}
            />
            <Post
                title={'Title Title Title Title Title Title Title Title'}
                description={'description...description...description...description...description...description...description...description...description...description...description...description...description...description...'}
                tags={[]}
                image={'...'}
            />
        </Box>
    )
}

const forumPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* background */}
            <Container maxWidth={false} disableGutters sx={{ height: 'auto', bgcolor: '#fff0ce' }}>
                <Box sx={{ width: 0.75, height: '100%', bgcolor: '#fcf7ed', margin: 'auto', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>

                    {/* post List */}
                    <PostList />

                    {/* add new post */}
                    <AddBtn />

                    {/* go back to top */}
                    <TopBtn />
                </Box>
            </Container>
        </div>
    )
}

export default forumPage