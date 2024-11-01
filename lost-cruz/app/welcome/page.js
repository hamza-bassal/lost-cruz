// This is the title page of the application where it prompts users to login. 

'use client'

import { useState } from 'react';
import { Box, Button, FormControl, IconButton, TextField, Link } from '@mui/material'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';

import styles from "./page.module.css";

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Home() {
  const [login, setLogin] = useState(false)
  const [help, setHelp] = useState(false)

  const LoginBox = () => {
    return (
      <Box className={styles.loginBox}>
        <Box>
          <IconButton onClick={() => { setLogin(false) }}
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
              cursor: 'default'
            }}
          >LOGIN</Box>
        </Box>
        <FormControl
          sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
        >
          <Box>
            <TextField fullWidth id='username' label='username' variant='filled' size='small'></TextField>
          </Box>

          <Box>
            <TextField fullWidth id='password' label='password' variant='filled' size='small'></TextField>
          </Box>

        </FormControl>
        <Button variant='contained' sx={{ width: '50%', alignSelf: 'center', marginTop: '10px', marginBottom: '10px' }}>SIGN IN</Button>
      </Box>
    )
  }

  const GoogleSignInButton = () => {
    const [error, setError] = useState(null);
  
    const handleSignIn = async () => {
      try {
        await signInWithPopup(auth, provider);
        // Redirect or update UI after successful sign-in
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <Box
              sx={{
                paddingTop: '30px',
                width: 1,
                display: 'flex',
              }}>
                <Button variant='contained'
                sx={{
                  width: 0.75,
                  bgcolor: '#FFC436',
                  fontWeight: 'bold',
                  margin: 'auto',
                }}>Google Login</Button>
              </Box>
    );
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
        </Box>
        <Box sx={{ wordWrap: 'break-word' }}>
          <p style={{ marginBottom: '20px' }}>texttexttexttexttext</p>
          <p style={{ marginBottom: '20px' }}>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
          <p style={{ marginBottom: '20px' }}>texttexttexttexttexttexttexttexttext</p>
          <p style={{ marginBottom: '20px' }}>texttexttexttexttext</p>
        </Box>
      </Box>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* logo */}
        <Box sx={{ width: 0.4, height: 1, bgcolor: '#FFC436' }}>
          {/* ----- Img here ------ */}
        </Box>

        <Box maxWidth={0.5} alignSelf={'center'}>
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
            <p style={{ marginBottom: '20px' }}>texttexttexttexttext</p>
            <p style={{ marginBottom: '20px' }}>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
            <p style={{ marginBottom: '20px' }}>texttexttexttexttexttexttexttexttext</p>
            <p style={{ marginBottom: '20px' }}>texttexttexttexttext</p>
          </Box>

          {/* Log-in Button */}
          <GoogleSignInButton></GoogleSignInButton>
          <Box
            sx={{
              paddingTop: '30px',
              width: 1,
              display: 'flex',
            }}><Button variant='contained'
              onClick={() => { setLogin(true); setHelp(false); }}
              sx={{
                width: 0.75,
                bgcolor: '#FFC436',
                fontWeight: 'bold',
                margin: 'auto',
              }}>BEANS</Button>
              </Box>
          <Link href={`/forum`}
             sx={{
               paddingTop: '30px',
               width: 1,
               display: 'flex',
               textDecoration: 'none'
             }}>
            <Box
              sx={{
                paddingTop: '30px',
                width: 1,
                display: 'flex',
              }}>
                <Button variant='contained'
                sx={{
                  width: 0.75,
                  bgcolor: '#FFC436',
                  fontWeight: 'bold',
                  margin: 'auto',
                }}>Continue as Guest</Button>
              </Box>
          </Link>
        </Box>

        {login &&
          <LoginBox></LoginBox>}

        {/* Footer */}
        <Box sx={{
          position: 'fixed',
          bottom: '10px',
          right: '20px',
          color: '#FCF7ED'
        }}>--- footer ---</Box>

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
