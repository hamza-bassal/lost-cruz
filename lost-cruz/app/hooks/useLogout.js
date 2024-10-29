import { useSignOut } from 'react-firebase-hooks/auth';
import {auth} from '../../firebase'
import { useRouter } from "next/navigation"; // Import Next.js router
import useAuthStore from "../store/authStore";

const useLogout = () => {
    const router = useRouter(); // Initialize Next.js router
    //console.log("INSIDE USELOGOUT");
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const logoutUser = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try{
            await signOut();
            localStorage.removeItem('user-info');
            logoutUser();
            router.push("/auth");
        } catch (error){
            console.log(error);
        }
    };
    
    return {handleLogout,isLoggingOut,error};
};
export default useLogout