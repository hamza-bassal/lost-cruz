'use client'

import { Box, FormGroup, FormControlLabel, Checkbox, IconButton, Link, Button, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./navbar.module.css";
import { useState } from "react";
import useLogout from "@/app/hooks/useLogout"
import { tagOptions } from '../../data/tagsData';
import { Label } from "@mui/icons-material";

// Accepts udpate search method as parameter
const Navbar = ({ setSearch, setLostStatus }) => {
    const [open, setOpen] = useState(false); // filter
    const [prof, setProf] = useState(false); // profile
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedLostStatus, setSelecLost] = useState(["LOST", "FOUND"]);

    const { handleLogout, isLoggingOut, error } = useLogout();

    const handleLostCheckboxChange = (event, status) => {
        const isChecked = event.target.checked;
    
        setSelecLost((statuses) => {
            if (isChecked) {
                return [...statuses, status];  // Add the tag to the selectedTags array
            } else {
                return statuses.filter((exisitngStatus) => exisitngStatus != status);  // Remove the tag
            }
        });
    };


    const handleTagCheckboxChange = (event, tag) => {
        const isChecked = event.target.checked;
    
        setSelectedTags((prevTags) => {
            if (isChecked) {
                return [...prevTags, tag];  // Add the tag to the selectedTags array
            } else {
                return prevTags.filter((existingTag) => existingTag != tag);  // Remove the tag
            }
        });
    };
    
      // Trigger filter when user clicks the "Filter" button
    const handleFilterClick = () => {
        setSearch(selectedTags);  // Update the searchTerms in the parent component
        if (selectedLostStatus.length == 0) {
            setSelecLost(["LOST", "FOUND"])
            setLostStatus(["LOST", "FOUND"]);
        } else {
            setLostStatus(selectedLostStatus);
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('/api/sendScheduledEmails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.CRON_SECRET}`,
            },
          });
    
          if (response.ok) {
            setStatus('Email sent successfully!');
          } else {
            setStatus('Failed to send email.');
          }
        } catch (error) {
          setStatus('Error: ' + error.message);
        }
    };

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
                        <FormControlLabel 
                        control={<Checkbox 
                            checked={selectedLostStatus.includes("LOST")} 
                            onChange={(event) => handleLostCheckboxChange(event, "LOST")}
                            size="small" />} 
                            label="Lost" />
                        <FormControlLabel 
                        control={<Checkbox 
                            checked={selectedLostStatus.includes("FOUND")} 
                            onChange={(event) => handleLostCheckboxChange(event, "FOUND")}
                            size="small" />} 
                            label="Found" />
                    </FormGroup>
                    <hr className={styles.hr} />
                    <FormGroup column>
                        {tagOptions.map((tag, index) => (
                            <FormControlLabel key={tag || index} 
                            control={<Checkbox 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} 
                                checked={selectedTags.includes(tag)} 
                                onChange={(event) => handleTagCheckboxChange(event, tag)}
                                />} 
                            label={tag} />
                        ))}
                    </FormGroup>
                    <Box sx={{
                        width: '200px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onClick={handleFilterClick} >
                        <Box
                            sx={{
                                width: '100%',
                                height: '80%',
                                bgcolor: '#FFC436',
                                borderRadius: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography sx={{color: 'black', fontWeight: 'bold', fontSize: '20px',}}>
                                Filter
                            </Typography>
                        </Box>
                    </Box>
                </div>}
            </div>
        )
    }

    const Search = ({ }) => {
        const [tempSearchInput, setTempSearchInput] = useState("");  // Temporary value for input
        const [searchInput, setSearchInput] = useState("");  // Final value to store search term
    
        // Handle input change, but don't update searchInput yet
        const handleSearchChange = (event) => {
            setTempSearchInput(event.target.value);  // Update the temporary search input
        };
    
        // Handle the search button click
        const handleSearchClick = () => {
            if (tempSearchInput.trim()) {
                setSearch(tempSearchInput.trim());  // Update the search term in the parent
                setSearchInput(tempSearchInput.trim());  // Update the final search input
                console.log("Search term is:", tempSearchInput.trim());
            } else {
                setSearch("");  // Clear the search in parent if input is empty
                setSearchInput("");  // Clear the input
                console.log("Search term is cleared");
            }
        };
    
        return (
            <div className={styles.searchWrapper}>
                <form
                    className={styles.searchForm}
                    method="get"
                    action="/"
                    id="searchForm"
                    onSubmit={(e) => e.preventDefault()}  // Prevent form submission
                >
                    <input
                        className={styles.searchBar}
                        type="text"
                        placeholder="Search"
                        id="searchInput"
                        value={tempSearchInput}  // Bind the input value to the temporary state
                        onChange={handleSearchChange}  // Capture input changes
                    />
                    <IconButton onClick={handleSearchClick}> {/* Trigger search when icon is clicked */}
                        <SearchIcon sx={{ color: '#0174BE' }} />
                    </IconButton>
                </form>
            </div>
        );
    };
    


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
                    className={styles.logo}
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
                        {/* <Box>
                            <Button sx={{ color: '#FFC436' }} onClick={handleSubmit}>E-test</Button>
                        </Box> */}
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default Navbar;
