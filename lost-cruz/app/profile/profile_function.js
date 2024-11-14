import { firestore } from '@/firebase';
import {
    updateDoc,
    collection,
    doc,
    getDocs,
    query,
    deleteDoc,
    getDoc,
} from 'firebase/firestore';

import { orderBy, limit } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { storage } from "@/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function getUserSnap(userId) {
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return null;
    }
    return userSnap;
}

export async function changeUserName(userId,newUserName)
{
    const userSnap = getUserSnap(userId);
    if(userSnap === null)
    {
        return;
    }
    await updateDoc(userSnap,{
        username: newUserName
    });
}

export async function changeFullName(userId,newFullName)
{
    const userSnap = getUserSnap(userId);
    if(userSnap === null)
    {
        return;
    }
    await updateDoc(userSnap,{
        fullName: newFullName
    });
}

export async function changeProfilePicture(userId,profilePicture)
{
    const userSnap = getUserSnap(userId);
    if(userSnap === null)
    {
        return;
    }

    const delete_success = deleteProfilePicture(userId);
    if(delete_success == null)
    {
        return;
    }

    const storageRef = ref(storage, `profilePicture/${profilePicture.name}`);
    let url = "";

    try {
      await uploadBytes(storageRef, profilePicture);
      url = await getDownloadURL(storageRef);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the files", error);
    } finally {
      //setUploading(false);
    }

    await updateDoc(userSnap,{
        profilePicture: url,
        profilePictureFileName: profilePicture.name
    });
}


export async function deleteProfilePicture(userId)
{
    const userSnap = getUserSnap(userId);
    if(userSnap === null)
    {
        return null;
    }

    if(userSnap.data().profilePicture !== "" && userSnap.data().profilePictureFileName !== "")
    {
        const desertRef = ref(storage, `profilePicture/${userSnap.data().profilePictureFileName}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error("Can't find image!");
            return;
        });

        await updateDoc(userSnap,{
            profilePicture: "",
            profilePictureFileName: ""
        });
    }
}


export async function addFollowers(userId,followerId) {
    const userSnap = getUserSnap(userId);
    if(userSnap === null)
    {
        return;
    }

    //Does follower exist
    const followerSnap = getUserSnap(followerId);
    if(followerSnap === null)
    {
        return;
    }

    let userFollowerList = (await userSnap).data().followers;
    let followerFollowingList = (await followerSnap).data().following;

    if(userFollowerList.include(followerId) == false)
    {
        await updateDoc(userSnap,{
            followers: userFollowerList.push(followerId)
        });
    }

    if(followerFollowingList.include(userId) == false)
    {
        await updateDoc(followerSnap,{
            following: userFollowerList.push(userId)
        });
    }
}


export async function removeFollowers(userId,followerId) {
    const userSnap = getUserSnap(userId);
    if(userSnap === null)
    {
        return;
    }

    //Does follower exist
    const followerSnap = getUserSnap(followerId);
    if(followerSnap === null)
    {
        return;
    }

    let userFollowerList = (await userSnap).data().followers;
    let followerFollowingList = (await followerSnap).data().following;

    if(userFollowerList.include(followerId) == false)
    {
        await updateDoc(userSnap,{
            followers: userFollowerList.filter((theFollowerId) => theFollowerId != followerId)
        });
    }

    if(followerFollowingList.include(userId) == false)
    {
        await updateDoc(followerSnap,{
            following: userFollowerList.filter((theFollowingId) => theFollowingId != userId)
        });
    }
}

export default {changeUserName,changeFullName,changeProfilePicture,removeFollowers,deleteProfilePicture,addFollowers};