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

//If immage name is a problem:
//https://stackoverflow.com/questions/37444685/store-files-with-unique-random-names

//Get methods


//This function will return the user name from user id
export async function getUserName(userId)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data().username;
}


//This function will return the Full Name from the user id
export async function getFullName(userId)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data().fullName;
}


//This function will return the bio of the user id
export async function getBio(userId)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data().bio;
}


//This function will return a url to the profile picture
export async function getProfilePicture(userId) {
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data().profilePicture;
}


//This function will return a list of follower user id
export async function getFollowers(userId) {
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data().followers;
}


//This function will return a list of following user id
export async function getFollowing(userId){
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data().following;
}


//Other method
//Tested
//This function will change the user name
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
//This function will change the full name
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

//This function will change the bio
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

//This function will change the pprofile picture
export async function changeProfilePicture(userId,profilePicture)
{
    const userRef = doc(firestore,'users',userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists() == false)
    {
        return;
    }

    const delete_success = await deleteProfilePicture(userId);
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


//This function will delete the profile picture
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

//This function will add a follower to the user and following to the follower
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
            followers: arrayUnion(followerId)
        });
    }

    //Add user to follower's following list
    if(followerFollowingList.include(userId) == false)
    {
        await updateDoc(followerRef,{
            following: arrayUnion(userId)
        });
    }
}


//This function will remove a follower to the user and following to the follower
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

export default {changeUserName,changeFullName,changeProfilePicture,removeFollowers,deleteProfilePicture,addFollowers,changeBio,getBio,getFollowers,getFollowing,getFullName,getProfilePicture,getUserName};