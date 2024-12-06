// This page is where the post page will direct to once the user clicks on 'contact'
// It's connected to a post via a post-id, hence why both folders are present within
// the forum folder
// There's exists a handshake system where the differentiating part is what their 'ID'
// is called even when referencing the same thing. The id is then used to retrieve information
// to help accomplish tasks

'use client'

import {
    Box,
    IconButton,
    TextField,
    Link,
    Checkbox,
    FormControlLabel,
    Button,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/navigation"; // Import Next.js router
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc} from 'firebase/firestore'
import { firestore } from '@/firebase'

import styles from "./contact.module.css"
import Guideline from "./guideline"

import { useRequireAuth } from '../../../hooks/useRequireAuth';


const ContactForm = ({ params }) => {
    // const authUser1 = useRequireAuth();
    //const { email, loading, error } = useUserEmail(params.contactId);
    const router = useRouter();

    // if (!authUser1) {
    //     return null;
    // }

    const [formData, setFormData] = useState({ name: '', email: '', message: '', postID: params.contactId });
    const [boxChecked, setBoxChecked] = useState(false)  // enable continue button if box checked
    const [agree, setAgree] = useState(false); // show the contact form after user read the guidelines
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSent(false);
    };

    const auth = getAuth();
    const [userId, setUserId] = useState(""); // current user id

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is authenticated");
                setUserId(user.uid);
            }
        });
    
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []); // Empty dependency array ensures this runs only once

    const handleSubmit = async() => {

        if (!formData.name || !formData.email || !formData.message) {
            console.log(formData.message.length)
            alert("Please fill out all required fields.");
            return;
        }

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const safety = await fetch('/api/sendGuideline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postID: params.contactId }),
            });

            // Get a reference to the specific document by postID
            const postRef = doc(firestore, 'posts', params.contactId);

            // Fetch the document
            const postSnapshot = await getDoc(postRef);

            // Check if the document exists and extract its data
            const post = { postID: postSnapshot.id, ...postSnapshot.data() };

            const userDocRef = doc(firestore, 'users', post.userID);

            await updateDoc(userDocRef, {
                recievedGuideline: true
            });

            if (response.ok && safety.ok) {
                alert("Email sent successfully!");
                router.push(`/forum/${params.contactId}`)
            } else {
                setSent(false);
            }
        } catch (error) {
            alert("Email failed to send! Try again later.");
        }
    };

    return (
        <Box>
            {/* Show the safety guidelines */}
            {!agree &&
                <Box sx={{
                    bgcolor: '#FCF7ED',
                    height: '100vh',
                    width: '100vw',
                    position: 'absolute',
                    padding: '20px',
                }}>
                    {/* Document */}
                    <Box className={styles.docBox}>
                        <Guideline />
                    </Box>

                    {/* Checkbox */}
                    <FormControlLabel
                        // enable the continue button if checked
                        control={<Checkbox onChange={() => { setBoxChecked(prev => !prev); }} />}
                        label="I have read and understood the guidelines shown above"
                        sx={{ padding: "0 30px", }}
                    />

                    {/* Back and Continue buttons */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        gap: '20px',
                        padding: "10px 30px",
                    }}>
                        {/* Back button: go back to the post page */}
                        <Button variant="outlined"
                            fullWidth
                            href={`/forum/${params.contactId}`}
                        >Back</Button>

                        {/* Continue button: only available after user checked the checkbox 
                            send the user to the contact form   */}
                        <Button variant="contained"
                            fullWidth
                            disabled={!boxChecked}
                            onClick={() => { setAgree(true); }}
                        >Continue</Button>
                    </Box>
                </Box>
            }

            {/* After users read the guidelines, show the contact form */}
            {agree &&
                <Box sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#FCF7ED'
                }}>
                    {/* close + send */}
                    <Box className={styles.closeSend}>
                        <IconButton sx={{ color: '#0174BE' }}>
                            <Link href={`/forum/${params.contactId}`}>
                                <CloseIcon fontSize="large" />
                            </Link>
                        </IconButton>

                        <IconButton 
                            sx={{ color: '#FFC436' }} 
                            onClick={() => {
                                handleSubmit();
                                setSent(true); // Disable the button
                            }}
                            disabled={sent}
                        >
                            <SendIcon fontSize="large" />
                        </IconButton>
                    </Box>

                    {/* Title */}
                    <Box className={styles.title}>Contact Form</Box>

                    {/* Name */}
                    <Box className={styles.inputBox} sx={{ gap: '5%' }}>
                        <label>Name: </label>
                        <TextField id="name" required variant="standard" fullWidth placeholder="name"
                            sx={{ bgcolor: 'white', paddingLeft: '2px', borderRadius: '5px' }}
                            name="name" value={formData.name} onChange={handleChange}
                            slotProps={{htmlInput: {maxLength: 50}}} >
                        </TextField>
                    </Box>

                    {/* Email */}
                    <Box className={styles.inputBox}>
                        <label>Email Address: </label>
                        <TextField id="email" required variant="standard" fullWidth placeholder="email"
                            sx={{ bgcolor: 'white', paddingLeft: '2px', borderRadius: '5px' }}
                            name="email" value={formData.email} onChange={handleChange}
                            slotProps={{htmlInput: {maxLength: 50}}} >
                        </TextField>
                    </Box>

                    {/* message */}
                    <label style={{
                        marginTop: '20px',
                        paddingLeft: '7.5%',
                    }}>Message:</label>
                    <TextField fullWidth multiline rows={11} id="message" variant="standard"
                        slotProps={{
                            htmlInput: {
                                style: {
                                    fontSize: 20, 
                                    paddingLeft: '10px', 
                                    paddingRight: '10px', 
                                    borderRadius: '5px'
                                },
                                maxLength: 1000 // Also include maxLength here
                            }
                        }}
                        sx={{
                            alignSelf: 'center',
                            padding: '20px',
                            paddingLeft: '7.5%',
                            paddingRight: '7.5%',
                            "& .MuiInput-root": {
                                bgcolor: 'white'
                            }
                        }}
                        name="message" value={formData.message} onChange={handleChange}>
                    </TextField>
                </Box>
            }
        </Box>
    )
}

//Function is exported out to the subfolders requiring retrieving data
//from a post-id
// async function getDocumentById(collectionName, documentId) {
//     const docRef = doc(firestore, collectionName, documentId);

//     try {
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         return docSnap.data(); 
//       } else {
//         console.log("No such document!");
//       }
//     } catch (error) {
//       console.error("Error getting document:", error);
//     }
// }

export default ContactForm
