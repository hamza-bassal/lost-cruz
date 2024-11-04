// This is the title page of the application where it prompts users to login. 

'use client'

import { useState } from 'react';
import { Box, Button, IconButton, Link } from '@mui/material'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';

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
              fontSize: '30px',
              fontWeight: 'bolder',
              color: '#0C356A',
              textAlign: 'center',
              textDecoration: 'underline',
              cursor: 'default',
              marginBottom: '20px',
            }}
          >{showLogin ? "LOGIN" : "SIGN UP"}</Box>
        </Box>
        {/* goes to login or signup page on user choice */}
        <Box>
          {showLogin ? <Login /> : <Signup />}
          <Button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
          </Button>
          {/* same as above but with no box */}
          {/* <Box mx={2} fontSize={14}>
						{showLogin ? "Don't have an account?" : "Already have an account?"}
					</Box>
					<Box onClick={() => setShowLogin(!showLogin)} color={"blue.500"} cursor={"pointer"}>
						{showLogin ? "Sign up" : "Log in"}
					</Box> */}
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
              marginBottom: '20px',
            }}
          >ABOUT US</Box>
        </Box>
        <Box sx={{ wordWrap: 'break-word', marginBottom: '20px' }}>
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
          <Box
            sx={{
              paddingTop: '30px',
              width: 1,
              display: 'flex',
              flexDirection:'column',
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
            {/* Continue as guest */}
            <Link href={`/forum`}>
              <Box
                sx={{
                  paddingTop: '15px',
                  color: 'white',
                  fontSize: 'small',
                }}>Continue as Guest</Box>
            </Link>
          </Box>

        </Box>
        {login && <LoginBox />}

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
