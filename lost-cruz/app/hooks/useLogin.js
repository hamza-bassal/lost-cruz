import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation"; // Import Next.js router
import { sendEmailVerification } from "firebase/auth"; // Import sendEmailVerification

const useLogin = () => {
    const router = useRouter(); // Initialize Next.js router
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
                // Check if the user's email is verified
                if (!userCred.user.emailVerified) {
                    alert("Please verify your email address before logging in.");
                    await sendEmailVerification(userCred.user);
                    //await userCred.user.sendEmailVerification(); // Resend verification email if needed
                    return;
                }

                console.log("After verify check");

                // Fetch user data from Firestore
                const docRef = doc(firestore,"users",userCred.user.uid);
                const docSnap = await getDoc(docRef);

                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
                loginUser(docSnap.data())
                alert("Logged in successfully!");
                router.push("/forum");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {loading, error, login};
};
export default useLogin