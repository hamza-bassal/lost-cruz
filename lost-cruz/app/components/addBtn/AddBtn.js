'use client'

import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const TopBtn = () => {
    return (
        <div>
            <IconButton href="#">
                {/* redirect to create new post page */}
                <AddIcon
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
                        bottom: '16%',
                        right: '5%',
                    }}
                />
            </IconButton>
        </div>
    )
}

export default TopBtn