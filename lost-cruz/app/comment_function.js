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
    addDoc,
} from 'firebase/firestore';

import { orderBy, limit } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { storage } from "@/firebase";

import { uploadBytes, getDownloadURL } from "firebase/storage";

const comment_collection_name = 'comments';
const post_collection_name = 'posts';
const user_collection_name = 'users';

export async function createComment(localParentId,userId,localContent,the_collection)
{
    // Creating the documemnt for storing the comment
    const postsCollection = collection(firestore, comment_collection_name);
    const docRef = await addDoc(postsCollection, {
        parentId: localParentId,
        creatorId: userId,
        content: localContent,
        childComment:[],
        timestamp: Timestamp.now()
    })

    const commentId = docRef.id;

    // Adding the commentId back to the parentDoc
    const parentRef = doc(firestore,the_collection,localParentId);
    updateDoc(parentRef,{
        childComment: commentId
    });   
}


// This function is used when the comment is created from a post
export async function createCommentFromPost(localParentId,userId,localContent)
{
    //Call createComment with "post" collection
    createComment(localParentId,userId,localContent,post_collection_name);
}


// This function is used when the comment is created from a comment
export async function createCommentFromComment(localParentId,userId,localContent)
{
    //Call createComment with "post" collection
    createComment(localParentId,userId,localContent,comment_collection_name);
}


// This function will return comment from the parentId
export async function getCommentFromParent(parentId,the_collection)
{
    // query(collection(firestore, the_collection),orderBy("timestamp","desc"))
    query(collection(firestore, the_collection),where("parentId","==",parentId),orderBy("timestamp"));
}


//This function will return comment from posts collection with parentId
export async function getCommentFromParentPost(parentId)
{
    getCommentFromParent(parentId,post_collection_name);
}


//This function will return comment from comment collection with parentId
export async function getCommentFromParentComment(parentId)
{
    getCommentFromParent(parentId,comment_collection_name);
}


//This function will delete the comment
export async function deleteComment(ParentId,userId,commentId,the_collection) {
    //Confirm Box
    let result = confirm("Are you sure you want to delete the post?");
    if(result == false)
    {
        return;
    }
    const docRef = doc(firestore, 'comment', commentId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        console.error("Comment does not exist!");
        return;
    }

    const parentRef = doc(firestore,the_collection,ParentId)
    const parentSnap = await getDoc(parentRef)

    if (!(docSnap.exists() && userSnap.exists()))
    {
        console.error("Can't find comment or post");
        return;
    }

    //Delete commentId form Parent
    if(parentSnap.exists())
    {
        let parent_comment_list = parentSnap.data().childComment;
        let new_comment_list = parent_comment_list.filter((parentCommentId) => parentCommentId !== commentId);
        updateDoc(parentRef,{
            childComment: new_comment_list
        });
    }

    //Delete comment
    if (docSnap.exists()) {
        await deleteDoc(docRef)
        location.reload();
        alert("Comment Successfully Deleted!");
    }
    else {
        console.log("Can't find the comment!");
        return;
    }
}


//This function will delete the comment from post
export async function deleteCommentFromPost(parentId,commentId){
    deleteComment(parentId,commentId,post_collection_name);
}


//This function will delete the comment from commnet
export async function deleteCommentFromComment(parentId,commentId){
    deleteComment(parentId,commentId,comment_collection_name);
}


//This function will return true if the user is the owner of comment
export async function isUserOwnerOfComment(userId,commentId)
{
    const docRef = doc(firestore, 'comment', commentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.error("Comment does not exist!");
        return;
    }

    if(docRef.userId === userId)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export default {createComment, createCommentFromComment, createCommentFromPost, getCommentFromParent, getCommentFromParentComment, getCommentFromParentPost, deleteComment, deleteCommentFromComment, deleteCommentFromPost, isUserOwnerOfComment};