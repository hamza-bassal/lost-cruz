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

import { uploadBytes, getDownloadURL } from "firebase/storage";

//Tested
export async function changeUserName(userId,newUserName)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
    }
    await updateDoc(userRef,{
        username: newUserName
    });
}

//Tested
export async function changeFullName(userId,newFullName)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
    }
    await updateDoc(userRef,{
        fullName: newFullName
    });
}

export async function changeBio(userId,newBio)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
    }
    await updateDoc(userRef,{
        bio: newBio
    });
}

export async function changeProfilePicture(userId,profilePicture)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
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

    await updateDoc(userRef,{
        profilePicture: url,
        profilePictureFileName: profilePicture.name
    });
}


export async function deleteProfilePicture(userId)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
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

        await updateDoc(userRef,{
            profilePicture: "",
            profilePictureFileName: ""
        });
    }
}


export async function addFollowers(userId,followerId) {
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
    }

    //Does follower exist
    const followerRef = doc(firestore,'users',followerId);
    const followerSnap = await getDoc(followerRef);
    if(followerSnap.exists() == false)
    {
        return;
    }

    let userFollowerList = (await userSnap).data().followers;
    let followerFollowingList = (await followerSnap).data().following;

    //Add follower to user's follower list
    if(userFollowerList.include(followerId) == false)
    {
        await updateDoc(userRef,{
            followers: userFollowerList.push(followerId)
        });
    }

    //Add user to follower's following list
    if(followerFollowingList.include(userId) == false)
    {
        await updateDoc(followerRef,{
            following: userFollowerList.push(userId)
        });
    }
}


export async function removeFollowers(userId,followerId) {
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
    }

    //Does follower exist
    const followerRef = doc(firestore,'users',followerId);
    const followerSnap = await getDoc(followerRef);
    if(followerSnap.exists() == false)
    {
        return;
    }

    let userFollowerList = (await userSnap).data().followers;
    let followerFollowingList = (await followerSnap).data().following;

    //Delete follower to user's follower list
    if(userFollowerList.include(followerId) == false)
    {
        await updateDoc(userRef,{
            followers: userFollowerList.filter((theFollowerId) => theFollowerId != followerId)
        });
    }

    //Delete user to follower's following list
    if(followerFollowingList.include(userId) == false)
    {
        await updateDoc(followerRef,{
            following: userFollowerList.filter((theFollowingId) => theFollowingId != userId)
        });
    }
}

export default {changeUserName,changeFullName,changeProfilePicture,removeFollowers,deleteProfilePicture,addFollowers};