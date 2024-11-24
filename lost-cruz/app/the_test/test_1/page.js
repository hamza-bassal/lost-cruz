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

import {createComment, createCommentFromComment, createCommentFromPost, getCommentFromParent, getCommentFromParentComment, getCommentFromParentPost, deleteComment, deleteCommentFromComment, deleteCommentFromPost} from "../../comment_function"

export default function Home() {
    return (<div>Testing
        <div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { createCommentFromPost("UCXelmbhWRNHnl2RhliN","Lk3Vskz3ZuZQGV1wewJxEPUn3c13","天皇陛下万歳") }}>
                    Make Comment to post
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { console.log(getCommentFromParentPost("UCXelmbhWRNHnl2RhliN")) }}>
                    Print Comment
                    </Button>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Button variant="contained" onClick={() => { deleteCommentFromPost("UCXelmbhWRNHnl2RhliN",) }}>
                    Delete Comment
                    </Button>
            </div>
        </div>
    </div>
    );

    
}
