// This page is where the post page will direct to once the user clicks on 'contact'

'use client'

import { Box, IconButton, TextField } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import styles from "./contact.module.css"

const ContactForm = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#FCF7ED'
        }}>
            {/* close + send */}
            <Box className={styles.closeSend}>
                <IconButton sx={{ color: '#0174BE' }}>
                    <CloseIcon fontSize="large" />
                </IconButton>

                <IconButton sx={{ color: '#FFC436' }}>
                    <SendIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* Title */}
            <Box className={styles.title}>Contact Form</Box>

            {/* Name */}
            <Box className={styles.inputBox} sx={{ gap: '50px' }}>
                <label>Name: </label>
                <TextField id="name" required variant="standard" fullWidth placeholder="name"
                    sx={{ bgcolor: 'white', paddingLeft: '2px', borderRadius: '5px' }}></TextField>
            </Box>

            {/* Email */}
            <Box className={styles.inputBox}>
                <label>Email Address: </label>
                <TextField id="email" required variant="standard" fullWidth placeholder="email"
                    sx={{ bgcolor: 'white', paddingLeft: '2px', borderRadius: '5px' }}></TextField>
            </Box>

            {/* message */}
            <label style={{
                marginTop: '20px',
                paddingLeft: '7.5%',
            }}>Message:</label>
            <TextField fullWidth multiline rows={11} id="message" variant="standard"
                InputProps={{ style: { fontSize: 20, paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' } }}
                sx={{
                    alignSelf: 'center',
                    padding: '20px',
                    paddingLeft: '7.5%',
                    paddingRight: '7.5%',
                    "& .MuiInput-root": {
                        bgcolor: 'white'
                    }
                }}>
            </TextField>
        </Box>
    )
}

export default ContactForm