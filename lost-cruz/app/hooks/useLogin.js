import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    console.log("INSIDE USE LOGIN");
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);

    const login = async(inputs) => {
        if(!inputs.email || !inputs.password){
            console.log("fill everything");
            return
        }
        try{
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if(userCred){
                const docRef = doc(firestore,"users",userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
                loginUser(docSnap.data())
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {loading, error, login};
};
export default useLogin