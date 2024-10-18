'use client'

import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TopBtn = () => {
    return (
    <div>
        <IconButton href="#">
            <KeyboardArrowUpIcon 
                sx={{
                    borderStyle: 'solid',
                    borderColor: '#0174BE',
                    borderWidth: '1px',
                    borderRadius: '50px',
                    height: '50px',
                    width: '50px',
                    color: 'white',
                    bgcolor: '#0174BE',
                    position: 'fixed',
                    bottom: '5%',
                    right: '5%',
                }}
            />
        </IconButton>
    </div>
)}

export default TopBtn