import { firestore } from '@/firebase'
import {
    updateDoc,
    collection,
    doc,
    getDocs,
    query,
    deleteDoc,
    getDoc,
} from 'firebase/firestore'

import { orderBy, limit } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { storage } from "@/firebase"

export async function removePost(documentId){
    //Confirm Box
    let result = confirm("Are you sure you want to delete the post?");
    if(result == false)
    {
        return;
    }
    const docRef = doc(firestore, 'posts', documentId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        console.error("Post does not exist!");
        return;
    }

    const userRef = doc(firestore,'users',docSnap.data().userID)
    const userSnap = await getDoc(userRef)

    if (!(docSnap.exists() && userSnap.exists()))
    {
        console.error("Can't find post or user");
        return;
    }

    //https://stackoverflow.com/questions/49536475/firebase-reffromurl-is-not-a-function
    //Delete image
    //await deleteFile(storage.refFromURL(docSnap.data().imageURL));

    //https://firebase.google.com/docs/storage/web/delete-files#web
    const desertRef = ref(storage, `images/${docSnap.data().imageName}`);

    // Delete the file
    deleteObject(desertRef).then(() => {
    // File deleted successfully
    }).catch((error) => {
    // Uh-oh, an error occurred!
    console.error("Can't find image!");
    return;
    });

    //Delete postID form user
    if(userSnap.exists())
    {
        let user_post_list = userSnap.data().posts;
        let new_post_list = user_post_list.filter((postID) => postID !== documentId);
        updateDoc(userRef,{
            posts: new_post_list
        });
    }

    //Delete post
    if (docSnap.exists()) {
        await deleteDoc(docRef)
        location.reload();
        alert("Post Successfully Deleted!");
    }
    else {
        console.log("Can't find the post!");
        return;
    }
}

export default removePost;