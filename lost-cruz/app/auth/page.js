// This is the title page of the application where it prompts users to login. 

'use client'

import { useState } from 'react';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


import styles from "./page.module.css";

import Login from "./login";
import Signup from "./signup";

import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated'; // Adjust the path as needed

export default function AuthPage() {

  // This hook redirects to a different page if the user is already authenticated
  useRedirectIfAuthenticated();

  const [showLogin, setShowLogin] = useState(true);

  const [login, setLogin] = useState(false)
  const [help, setHelp] = useState(false)

  const [forgotPassword, setForgotPassword] = useState(false); // State for the Forgot Password modal
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPasswordSubmit = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent! Check your inbox.');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
        setMessage('Failed to send password reset email. Please try again.');
      });
  };

  const LoginBox = () => {
    return (
      <Box className={styles.loginBox}>
        <Box>
          <IconButton onClick={() => { setLogin(false); setShowLogin(true); }}
            sx={{ color: '#0174BE' }}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Box
            sx={{
              fontSize: '2rem',
              fontWeight: 'bolder',
              color: '#0C356A',
              textAlign: 'center',
              textDecoration: 'underline',
              cursor: 'default',
              marginBottom: '3%',
            }}
          >{showLogin ? "LOGIN" : "SIGN UP"}</Box>
        </Box>
        {/* goes to login or signup page on user choice */}
        <Box>
          {showLogin ? <Login /> : <Signup />}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '@media screen and (max-width: 640px)': {
              display: 'block',
              textAlign: 'center',
            },
          }}>
            <Button onClick={() => setShowLogin(!showLogin)}>
              {showLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            </Button>

            {/* Forgot Password Button */}
            <Button
              onClick={() => setForgotPassword(true)} // Open modal
              style={{
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Forgot Password?
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  const HelpBox = () => {
    return (
      <Box className={styles.helpBox}>
        <Box sx={{ marginBottom: '30px' }}>
          <IconButton onClick={() => { setHelp(false) }}
            sx={{ color: '#0174BE' }}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Box
            sx={{
              fontSize: '30px',
              fontWeight: 'bolder',
              color: '#0C356A',
              textAlign: 'center',
              textDecoration: 'underline',
              cursor: 'default',
            }}
          >ABOUT US</Box>
          <p style={{ marginTop: '10px', fontSize: 'large', textAlign: 'center', color: '#0C356A' }}>Login / Signup open to ucsc emails only</p>
        </Box>
        <Box sx={{ wordWrap: 'break-word', marginBottom: '20px' }}>
          <p style={{ marginBottom: '20px', fontSize: 'large', fontWeight: 'bold', textAlign: 'center' }}>-- HOW TO -- </p>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Report Lost Items:</p>
          <p style={{ marginBottom: '10px', paddingLeft: '30px' }}>Easily submit a post describing items you&#39;ve misplaced on campus.</p>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Report Found Items:</p>
          <p style={{ marginBottom: '20px', paddingLeft: '30px' }}> If you&#39;ve found something, you can post details and help reconnect it with its owner.</p>
          <p style={{ marginBottom: '20px', fontSize: 'large', fontWeight: 'bold', textAlign: 'center' }}>-- WHY USE LOST@CRUZ -- </p>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Convenient:</p>
          <p style={{ marginBottom: '10px', paddingLeft: '30px' }}>Accessible from any device, making it easy to report or search for items on the go.</p>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Efficient:</p>
          <p style={{ marginBottom: '10px', paddingLeft: '30px' }}>Streamlines the lost and found process with a user-friendly interface.</p>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Community-Driven:</p>
          <p style={{ marginBottom: '10px', paddingLeft: '30px' }}>Helping fellow Slugs find their lost belongings fosters a strong campus community.</p>
        </Box>
      </Box>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Box className={styles.cover} />
        <Box className={styles.textContainer}>
          {/* Title */}
          <h1 style={{
            color: '#FFC436',
            fontSize: '60px',
            fontWeight: 'bold',
            paddingBottom: '50px',
            textDecoration: 'underline',
            textDecorationStyle: 'double',
            cursor: 'default',
            userSelect: 'none',
          }}>Lost@Cruz</h1>

          {/* text body */}
          <Box sx={{
            maxWidth: 0.75,
            color: '#FCF7ED',
            wordWrap: 'break-word',
            paddingLeft: '40px',
          }}>
            <p style={{ marginBottom: '20px', fontSize: 'large', lineHeight: '1.3' }}>A platform for reporting and recovering lost and found items at UCSC.</p>
            <p style={{ marginBottom: '20px', fontSize: 'large', lineHeight: '1.3' }}> Whether you&#39;re a student, faculty, or staff, this service is designed to make the process of finding and returning lost belongings as seamless as possible.</p>
          </Box>

          {/* Log-in Button */}
          <Box
            sx={{
              paddingTop: '30px',
              width: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Button variant='contained'
              onClick={() => { setLogin(true); setHelp(false); }}
              sx={{
                width: 0.75,
                bgcolor: '#FFC436',
                fontWeight: 'bold',
                margin: 'auto',
              }}>LOGIN</Button>
          </Box>

        </Box>
        {login && <LoginBox />}

        {/* Forgot Password Modal */}
        <Dialog open={forgotPassword} onClose={() => setForgotPassword(false)}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setForgotPassword(false)}>Cancel</Button>
            <Button onClick={handleForgotPasswordSubmit}>Send Reset Email</Button>
          </DialogActions>
        </Dialog>

        {/* Footer */}
        <Box sx={{
          position: 'fixed',
          bottom: '10px',
          right: '20px',
          color: '#FCF7ED',
          cursor: 'default'
        }}>--- Lost@Cruz ---</Box>

        {/* Help Button */}
        <ContactSupportIcon
          fontSize="large"
          onClick={() => { !login && setHelp(true) }}
          sx={{
            position: 'fixed',
            top: '10px',
            right: '20px',
            color: '#FCF7ED',
            cursor: 'pointer'
          }} />

        {help && <HelpBox />}

      </div>
    </div>
  );
}
