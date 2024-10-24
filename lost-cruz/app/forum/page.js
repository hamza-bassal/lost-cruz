// This is the home page where it displays all the uploaded posts. 

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
  addDoc,
} from 'firebase/firestore'

import {orderBy, limit } from "firebase/firestore";  

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

const Post = ({postId, title, description, tags, imageURL }) => {
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
                                }}>{title} 
                                </Link>
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
                        <Tag tag={'tag2'} /> {/* only add availabe tags*/} 
                        <Tag tag={'tag3'} />
                        <Tag tag={'tag4'} />
                    </Box>
                </Box>
                {/* image(s) */}
                <Box sx={{ width: '200px', height: 'auto', bgcolor: '#FFC436', margin: '10px', borderRadius: '10px', overflow: 'hidden'}}
                >
                    {/* img here */}
                    {imageURL ? (
                        <img src={imageURL} alt="img" 
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
    // const post_len = 10;

    // // Generate the posts using .map()
    // const post = Array(post_len).fill(null).map((_, index) => (
    //     <Post
    //         key={index}         
    //         postId={index + 1}   // Unique key for each post
    //         title={`Title ${index + 1}`} // Unique title for each post
    //         description={'description'}
    //         tags={[]}
    //         imageURL={'...'}
    //     />
    // ));

    return (
        // Box or wrapper around the posts
        <Box className={styles.postListContainer}>  {/* You can apply a class for styling */}
            {/* {post}  Render the array of Post components inside the box */}
            {posts.map(({postID, title, description, imageURL}) => (
                <Post  
                    key={postID}     
                    postId={postID}   // Unique key for each post
                    title={title} // Unique title for each post
                    description={description}
                    tags={[]}
                    imageURL={imageURL}
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

//From google ai
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
// Example usage
/*
getDocumentById("posts", "Q60YabICxsgTWuBCIGnP")
.then(data => {
    if (data) {
    console.log("Document data:", data);
    }
});
*/

//I used this webpage to figure it out
// https://firebase.google.com/docs/firestore/query-data/order-limit-data#web
const q = query(collection(firestore,"posts"), orderBy("timestamp", "desc"), limit(3));
const docs = await getDocs(q);

docs.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
});


//Remove Post
//For some reason this function remove everything from the database
const removePost = async (documentId) => {
    const docRef = doc(firestore, 'posts', documentId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        await deleteDoc(docRef)
    }
    else
    {
        console.log("Can't find the post!");
    }

  }

// removePost()

export default forumPage