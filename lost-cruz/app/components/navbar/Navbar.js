'use client'

import { Box, FormGroup, FormControlLabel, Checkbox, IconButton, Link, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./navbar.module.css";
import { useState } from "react";
import useLogout from "@/app/hooks/useLogout"


const Navbar = () => {
    const [open, setOpen] = useState(false); // filter
    const [prof, setProf] = useState(false); // profile

    const { handleLogout, isLoggingOut, error } = useLogout();

    const MenuBtn = () => {
        return (
            <div className={styles.dropdown}>
                <IconButton>
                    <MenuIcon
                        fontSize="large"
                        onClick={() => {
                            setOpen(prev => !prev);
                            setProf(false);
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

    return (
        <Box className={styles.navBar}
            sx={{
                position: 'fixed',
                top: 0,
                zIndex: 10,
                bgcolor: '#0174BE',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            {/* Logo */}
            <Link href={`/forum`}>
                <Box
                    sx={{
                        padding: '10px',
                        fontWeight: 'bolder',
                        fontSize: '20px',
                        color: '#FCF7ED',
                        cursor: 'pointer'
                    }}
                >
                    Lost@Cruz
                </Box>
            </Link>

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
                }}
                    onClick={() => {
                        setProf(prev => !prev);
                        setOpen(false);
                    }}
                >
                    <Box
                        sx={{
                            width: '80%',
                            height: '80%',
                            bgcolor: '#FFC436',
                            margin: '10%',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}>
                        {/* Profile Image */}
                    </Box>
                </Box>

                {
                    prof &&
                    <Box className={styles.profdropdownBox}>
                        <Box>
                            <Button href={"/profile"}>Profile</Button>
                        </Box>
                        <Box>
                            <Button onClick={handleLogout}>Logout</Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default Navbar;
