import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth} from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import {firestore} from '../../firebase'
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation"; // Import Next.js router

const useSignUpWithEmailAndPassword = () => {
    const router = useRouter(); // Initialize Next.js router
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const loginUser = useAuthStore(state => state.login)

      const signup = async(inputs) => {
        console.log("INSIDE SIGNUP")
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
            console.log("Please fill all the fields")
            return
        }

        try {
            console.log(inputs.email, inputs.password)
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)

            if(!newUser && error){
                console.log(error)
                return
            }

            if(newUser){
                const userDoc = {
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullName:inputs.fullName,
                    bio:"",
                    profilePicture:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
                }
                await setDoc(doc(firestore, "users",newUser.user.uid), userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                loginUser(userDoc)
                alert("Logged in successfully!");
                router.push("/forum");
            }
        } catch (error) {
            console.log(error)
        }
      }
    return {loading,error,signup};
};

export default useSignUpWithEmailAndPassword