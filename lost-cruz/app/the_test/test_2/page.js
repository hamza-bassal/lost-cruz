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

//import useAuthStore from '../store/authStore';

import { auth } from '../../../firebase';

import React from 'react';
import Button from '@mui/material/Button';

import { getAuth } from "firebase/auth";

import {changeUserName,changeFullName,changeProfilePicture,removeFollowers,deleteProfilePicture,addFollowers,changeBio,getBio,getFollowers,getFollowing,getFullName,getProfilePicture,getUserName} from "../../profile/profile_function";

export default function Home() {
    const userId = "Lk3Vskz3ZuZQGV1wewJxEPUn3c13";
    const [userFullName, setUserFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [userBio, setUserBio] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState("");
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setUserFullName(await getFullName(userId));
            setUserName(await getUserName(userId));
            setUserBio(await getBio(userId));
            setUserProfilePicture(await getProfilePicture(userId));
            setUserFollowers(await getFollowers(userId));
            setUserFollowing(await getFollowing(userId));
        }
        fetchData();
    }, [userId]);

    return (
        <div>
            <div>
                <p>User Full Name: {userFullName}</p>
                <p>User Name: {userName}</p>
                <p>User Bio: {userBio}</p>
                <p>User Profile Picture: {userProfilePicture}</p>
                <p>User Followers: {userFollowers.length}</p>
                <p>User Following: {userFollowing.length}</p>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeUserName(userId,"Shinzo Abe");}}>
                    Change Name
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeFullName(userId,"Shinzo Abe");}}>
                    Change User Name
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeBio(userId,"hinzo Abe was a Japanese statesman and politician who served as the prime minister of Japan and president of the Liberal Democratic Party from 2006 to 2007 and again from 2012 to 2020. He was the longest-serving prime minister in Japanese history, serving for almost nine years in total.");}}>
                    Change Bio
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeProfilePicture();}}>
                    Change Profile Picture
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { addFollowers(userId,followerUserId);}}>
                    Add Followers    
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { removeFollowers(userId,followerUserId); location.reload(); }}>
                    Remove Followers 
                    </Button>
            </div>
            {/* Buttons for actions */}
        </div>
    );
}


/*
export default function Home() {

    const userId = "Lk3Vskz3ZuZQGV1wewJxEPUn3c13";
    const userFullName = getFullName(userId);
    const userName = getUserName(userId);
    const userBio = getBio(userId);
    const userProfilePicture = getProfilePicture(userId);
    const userFollowers = getFollowers(userId);
    const userFollowing = getFollowing(userId);

    const followerUserId = "PfKzrN7pKgV3Ss3Y2Vm8Jv7B5mb2";

    return (<div>Testing
        <div>
            <div>
                <p>User Full Name</p>
                <p>{userFullName}</p>
                <br></br>
                <p>User Name</p>
                <p>{userName}</p>
                <br></br>
                <p>User Bio</p>
                <p>{userBio}</p>
                <br></br>
                <p>User Profile Picture</p>
                <p>{userProfilePicture}</p>
                <br></br>
                <p>User Followers</p>
                <p>{userFollowers}</p>
                <br></br>
                <p>User Following</p>
                <p>{userFollowing}</p>
                <br></br>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeUserName(userId,"Shinzo Abe");}}>
                    Change Name
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeFullName(userId,"Shinzo Abe");}}>
                    Change User Name
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeBio(userId,"hinzo Abe was a Japanese statesman and politician who served as the prime minister of Japan and president of the Liberal Democratic Party from 2006 to 2007 and again from 2012 to 2020. He was the longest-serving prime minister in Japanese history, serving for almost nine years in total.");}}>
                    Change Bio
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { changeProfilePicture();}}>
                    Change Profile Picture
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { addFollowers(userId,followerUserId);}}>
                    Add Followers    
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { removeFollowers(userId,followerUserId); location.reload(); }}>
                    Remove Followers 
                    </Button>
            </div>
        </div>
    </div>
    );

    
}
*/