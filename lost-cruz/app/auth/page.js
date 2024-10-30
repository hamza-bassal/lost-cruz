// This is the title page of the application where it prompts users to login. 

'use client'

import { useState } from 'react';
import { Box, Button, FormControl, IconButton, TextField } from '@mui/material'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';

import styles from "./page.module.css";

import Login from "./login";
import Signup from "./signup";

export default function AuthPage() {

  const [showLogin, setShowLogin] = useState(true);

  /* previous login code
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
    */

  /*
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
    */

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

{/*         prints Login or Signup respectively, and loads that specific page     */}
          <h1 style={{
            color: '#FFC436',
            fontSize: '60px',
            fontWeight: 'bold',
            paddingBottom: '50px',
            textDecoration: 'underline',
            textDecorationStyle: 'double',
            cursor: 'default',
            userSelect: 'none',
          }}>{showLogin ? "Log in" : "Sign up"}</h1>

          {/* text body */}
          <Box sx={{
            maxWidth: 0.75,
            color: '#FCF7ED',
            wordWrap: 'break-word',
            paddingLeft: '40px',
          }}>
            {/* <p style={{ marginBottom: '20px' }}>texttexttexttexttext</p>
            <p style={{ marginBottom: '20px' }}>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
            <p style={{ marginBottom: '20px' }}>texttexttexttexttexttexttexttexttext</p>
            <p style={{ marginBottom: '20px' }}>texttexttexttexttext</p> */}
          </Box>

          {/* Log-in Button */}
          <Box
            sx={{
              paddingTop: '30px',
              width: 1,
              display: 'flex',
            }}>

              {/* goes to login or signup page on user choice */}
              <div>
                {showLogin ? <Login /> : <Signup />}
                <button onClick={() => setShowLogin(!showLogin)}>
                  {showLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>

              {/* same as above but with no box */}
              {/* <Box mx={2} fontSize={14}>
						{showLogin ? "Don't have an account?" : "Already have an account?"}
					</Box>
					<Box onClick={() => setShowLogin(!showLogin)} color={"blue.500"} cursor={"pointer"}>
						{showLogin ? "Sign up" : "Log in"}
					</Box> */}
              
              
              {/* <Button variant='contained'
              
              // onClick={() => { setLogin(true); setHelp(false); }}
              sx={{
                width: 0.75,
                bgcolor: '#FFC436',
                fontWeight: 'bold',
                margin: 'auto',
              }}>LOGIN</Button> */}
              </Box>
        </Box>


        {/* {login && <LoginBox></LoginBox>} */}

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

        {/* {help && <HelpBox />} */}

      </div>
    </div>
  );
}