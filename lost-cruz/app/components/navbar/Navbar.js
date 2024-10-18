'use client'

import { Box, FormGroup, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./navbar.module.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom"

const Search = () => {
    return (
        <div className={styles.searchWrapper}>
            <form className={styles.searchForm} method="get" action="/">
                <input className={styles.searchBar} type="text" placeholder="Search" />
                <IconButton>
                    <SearchIcon sx={{ color: '#0174BE' }} />
                </IconButton>
            </form>
        </div>
    )
}

const MenuBtn = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className={styles.dropdown}>
            <IconButton>
                <MenuIcon
                    fontSize="large"
                    onClick={() => {
                        setOpen(prev => !prev)
                    }}
                    sx={{
                        color: '#FCF7ED',
                        padding: '0px',
                    }} />
            </IconButton>

            {open && <div className={styles.dropdownBox}>
                <FormGroup row>
                    <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Lost" />
                    <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Found" />
                </FormGroup>
                <hr className={styles.hr} />
                <FormGroup row>
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                    <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />} label="element" />
                </FormGroup>
            </div>}
        </div>
    )
}

const Navbar = () => {
    // const navigate = useNavigate();
    return (
        <Box sx={{
            bgcolor: '#0174BE',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            {/* Logo */}
            <Box
                // onClick={() => {
                // navigate("/");  // ----------------- navigate to the main page (post list) -------------------
                // }}
                sx={{
                    padding: '10px',
                    fontWeight: 'bolder',
                    fontSize: '20px',
                    color: '#FCF7ED',
                    cursor: 'pointer'
                }}>Lost@Cruz</Box>

            {/* Search Bar */}
            <Search />

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                position: 'relative',
                padding: '0px',
            }}>
                {/* Filter Button */}
                <MenuBtn />

                {/* Profile */}
                <Box sx={{
                        width: '50px',
                        height: '50px',
                    }}>
                    <Box
                        // onClick={() => {
                        // navigate("/");  // ----------------- navigate to the user profile -------------------
                        // }}
                        sx={{
                            width: '80%',
                            height: '80%',
                            bgcolor: '#FFC436',
                            margin: '10%',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}>
                        {/* ----------------- profile image here ------------ */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar