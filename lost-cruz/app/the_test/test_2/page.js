'use client'
import { Container, Box, Link, Pagination } from "@mui/material"
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import {
    collection,
    doc,
    getDocs,
    query,
    deleteDoc,
    getDoc,
    where,
} from 'firebase/firestore'

import { orderBy, limit } from "firebase/firestore";

//import styles from "./forum.module.css"

import Navbar from "../../components/navbar/Navbar"
import TopBtn from "../../components/topBtn/TopBtn"
import AddBtn from "../../components/addBtn/AddBtn"

import { useRequireAuth } from '../../hooks/useRequireAuth';

import React from 'react';
import Button from '@mui/material/Button';

import {changeUserName,changeFullName,changeProfilePicture,removeFollowers,deleteProfilePicture,addFollowers,changeBio} from "../../profile/profile_function";

export default function Home() {
    return (<div>Testing
        <div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeUserName() }}>
                    Change Name
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeFullName() }}>
                    Change User Name
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeBio() }}>
                    Change Bio
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeProfilePicture() }}>
                    Change Profile Picture
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { addFollowers() }}>
                    Add Followers    
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { removeFollowers() }}>
                    Remove Followers 
                    </Button>
            </div>
        </div>
    </div>
    );

    
}
