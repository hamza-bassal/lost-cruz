// This page is where the post page will direct to once the user clicks on 'contact'
// It's connected to a post via a post-id, hence why both folders are present within
// the forum folder
// There's exists a handshake system where the differentiating part is what their 'ID'
// is called even when referencing the same thing. The id is then used to retrieve information
// to help accomplish tasks

"use client";

import { Box, IconButton, TextField, Link } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation"; // Import Next.js router
import { useState } from "react";

import useUserEmail from "../../../hooks/useUserEmail";

import styles from "./contact.module.css";

import { useRequireAuth } from "../../../hooks/useRequireAuth";

const ContactForm = ({ params }) => {
  const [isClient, setIsClient] = useState(false);
  const authUser1 = useRequireAuth();
  const { email, loading, error } = useUserEmail(params.contactId);
  const router = useRouter();

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // const authUser1 = useRequireAuth(); // Redirects to login if not authenticated

  // if (!authUser1) {
  //     // Show nothing or a loading spinner while redirecting
  //     return null;
  // }

  console.log(`Email is ${email}`);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const [email, setEmail] = useState("")
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    postID: params.contactId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Email sent successfully!");
        router.push(`/forum/${params.contactId}`);
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FCF7ED",
      }}
    >
      {/* close + send */}
      <Box className={styles.closeSend}>
        <IconButton sx={{ color: "#0174BE" }}>
          <Link href={`/forum/${params.contactId}`}>
            <CloseIcon fontSize="large" />
          </Link>
        </IconButton>

        <IconButton sx={{ color: "#FFC436" }} onClick={handleSubmit}>
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Title */}
      <Box className={styles.title}>Contact Form</Box>

      {/* Name */}
      <Box className={styles.inputBox} sx={{ gap: "50px" }}>
        <label>Name: </label>
        <TextField
          id="name"
          required
          variant="standard"
          fullWidth
          placeholder="name"
          sx={{ bgcolor: "white", paddingLeft: "2px", borderRadius: "5px" }}
          name="name"
          value={formData.name}
          onChange={handleChange}
        ></TextField>
      </Box>

      {/* Email */}
      <Box className={styles.inputBox}>
        <label>Email Address: </label>
        <TextField
          id="email"
          required
          variant="standard"
          fullWidth
          placeholder="email"
          sx={{ bgcolor: "white", paddingLeft: "2px", borderRadius: "5px" }}
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></TextField>
      </Box>

      {/* message */}
      <label
        style={{
          marginTop: "20px",
          paddingLeft: "7.5%",
        }}
      >
        Message:
      </label>
      <TextField
        fullWidth
        multiline
        rows={11}
        id="message"
        variant="standard"
        InputProps={{
          style: {
            fontSize: 20,
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "5px",
          },
        }}
        sx={{
          alignSelf: "center",
          padding: "20px",
          paddingLeft: "7.5%",
          paddingRight: "7.5%",
          "& .MuiInput-root": {
            bgcolor: "white",
          },
        }}
        name="message"
        value={formData.message}
        onChange={handleChange}
      ></TextField>
    </Box>
  );
};

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

export default ContactForm;
