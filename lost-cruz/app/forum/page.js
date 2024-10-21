'use client'
import { Container, Box, Link } from "@mui/material"
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

import styles from "./forum.module.css"

import Navbar from "../components/navbar/Navbar"
import TopBtn from "../components/topBtn/TopBtn"
import AddBtn from "../components/addBtn/AddBtn"


// const searchInventroy = async () => {
//   const snapshot = query(collection(firestore, 'inventory'))
//   const docs = await getDocs(snapshot)
//   const inventoryList = []
//   docs.forEach((doc) => {
//     if (doc.id.toLowerCase().includes(searchItem.toLowerCase())) {
//       inventoryList.push({ name: doc.id, ...doc.data() })
//     }
//   })
//   setInventory(inventoryList)
// }

// useEffect(() => {
//   updatePosts()
// }, [])

// const addItem = async (item) => {
//   const docRef = doc(collection(firestore, 'inventory'), item)
//   const docSnap = await getDoc(docRef)
//   if (docSnap.exists()) {
//     const { quantity } = docSnap.data()
//     await setDoc(docRef, { quantity: quantity + 1 })
//   } else {
//     await setDoc(docRef, { quantity: 1 })
//   }
//   await updateInventory()
// }

// const removeItem = async (item) => {
//   const docRef = doc(collection(firestore, 'inventory'), item)
//   const docSnap = await getDoc(docRef)
//   if (docSnap.exists()) {
//     const { quantity } = docSnap.data()
//     if (quantity === 1) {
//       await deleteDoc(docRef)
//     } else {
//       await setDoc(docRef, { quantity: quantity - 1 })
//     }
//   }
//   await updateInventory()
// }


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

const Post = ({postId, title, description, tags, image }) => {
    return (
        <Box className={styles.singlePost}>
            <Box className={styles.postContent}>
                <Box className={styles.postText}>
                    {/* title + description */}
                    <Box>
                        <Box className={styles.titleBox}>
                            <Link href={`/forum/${postId}`}
                                sx={{
                                    width: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '1.8em',
                                    fontWeight: 'bold',
                                    color: '#0C356A',
                                    whiteSpace: 'nowrap',
                                }}>{title} </Link>
                        </Box>
                        <Box className={styles.description}
                        sx={{
                            color: '#313b40',
                        }}>
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
                    </Box>
                </Box>
                {/* image(s) */}
                <Box sx={{ width: '200px', height: 'auto', bgcolor: '#FFC436', margin: '10px', borderRadius: '10px'}}
                >
                    {/* img here */}
                </Box>
            </Box>
        </Box>
    )
}

const PostList = () => {

    const [posts, setPosts] = useState([])
    // const [postName, setPostName] = useState('')
    // const [searchItem, searchItemName] = useState('')

    const updatePosts = async () => {
        const snapshot = query(collection(firestore, 'posts'))
        const docs = await getDocs(snapshot)
        const postsList = []
        docs.forEach((doc) => {
            postsList.push({ postID: doc.id, ...doc.data() })
        })
        setPosts(postsList)
    }

    useEffect(() => {
        updatePosts()
    }, [])
    /*
    This is where information retrieval to create new posts will be done. 
    We can limit the amount of posts with a modulo function.
    Current set-up for sprint 1 should just be that it displays the most
    recents posts within in the database.

    Things needed:
    - ID retrieval from storage for link generation to its specific page
        - This will then be used for information retrieval
    */
    const post_len = 8;

    // Generate the posts using .map()
    const post = Array(post_len).fill(null).map((_, index) => (
        <Post
            key={index}         
            postId={index + 1}   // Unique key for each post
            title={`Title ${index + 1}`} // Unique title for each post
            description={'description'}
            tags={[]}
            image={'...'}
        />
    ));

    return (
        // Box or wrapper around the posts
        <Box className={styles.postListContainer}>  {/* You can apply a class for styling */}
            {post}  {/* Render the array of Post components inside the box */}
            {posts.map(({postID, title, description}) => (
                <Post  
                    key={title}     
                    postId={9}   // Unique key for each post
                    title={title} // Unique title for each post
                    description={description}
                    tags={[]}
                    image={'...'}
                />
            ))}
        </Box>
    );
};

const forumPage = () => {

    return (
        <Box sx={{bgcolor: '#0174BE'}}>
            <Box sx={{bgcolor: '#0174BE', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-around',}}></Box>
            <Navbar></Navbar>
            {/* background */}
            <Container maxWidth={false} disableGutters sx={{ height: 'auto', bgcolor: '#fff0ce' }}>
                <Box sx={{ width: 0.75, height: '100%', bgcolor: '#fcf7ed', margin: 'auto', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>

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
    )
}

export default forumPage