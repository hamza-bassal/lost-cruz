'use client'

import { Box, Button } from '@mui/material'
import styles from "./page.module.css";
import Image from "next/image";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* logo */}
        <Box sx={{ width: 0.4, height: 1, bgcolor: '#FFC436' }}>
          {/* ----- Img here ------ */}
        </Box>

        {/* about us */}
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
            <p style={{marginBottom: '20px'}}>texttexttexttexttext</p>
            <p style={{marginBottom: '20px'}}>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
            <p style={{marginBottom: '20px'}}>texttexttexttexttexttexttexttexttext</p>
            <p style={{marginBottom: '20px'}}>texttexttexttexttext</p>
          </Box>

          {/* Log-in Button */}
          <Box sx={{
            paddingTop: '30px',
            width: 1,
            display: 'flex',
          }}><Button variant='contained'
            sx={{
              width: 0.75,
              bgcolor: '#FFC436',
              fontWeight: 'bold',
              margin: 'auto',
            }}>LOGIN</Button></Box>
        </Box>

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
        // onClick={() => {}}
        sx={{
          position: 'fixed',
          top: '10px',
          right: '20px',
          color: '#FCF7ED',
          cursor: 'pointer'
        }}/>
      </div>
    </div>
  );
}
