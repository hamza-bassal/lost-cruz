import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import {doc, setDoc, collection} from "firebase/firestore"
import {db} from "..\firebase.js"
import { serverTimestamp } from 'firebase/firestore';

// Reference:
// https://www.youtube.com/watch?v=wHKopeB8WMg&list=PL391NzrHDDl8N5Y-QZ8CoCPT3NXieduIT&index=11

  export const createPost = async (the_post) =>{
    const collectionRef = collection(db, "post");
    const postRef = doc(collection(db,"post"), the_post);
    const docSnap = await getDoc(docRef);
    if (text.current.value != ""){
      try{
        await setDoc(postRef, {
          documentID: document,
          title: title,
          text: text.current.value,
          image: image,
          email: email,
          location: location,
          timestamp: serverTimestamp()
        });
        text.current.value = "";
      } catch(err) {
        alert(err.message);
        console.log(err.message);
        return false;
      }
    }
    else
    {
      return false;
    }
  }