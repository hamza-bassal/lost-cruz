import { firestore } from '@/firebase';
import {
    updateDoc,
    collection,
    doc,
    getDocs,
    query,
    deleteDoc,
    getDoc,
    Timestamp,
} from 'firebase/firestore';

import { orderBy, limit } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { storage } from "@/firebase";

import { uploadBytes, getDownloadURL } from "firebase/storage";

export async function createComment(localParentId,userId,localContent)
{
    const postsCollection = collection(firestore, "comments");
    const docRef = await addDoc(postsCollection, {
        parentId: localParentId,
        creatorId: userId,
        content: localContent,
        childComment,
        timestamp: Timestamp.now()
    })

    const userRef = doc(firestore,'users',userId)
    const userSnap = await getDoc(userRef)

    
}