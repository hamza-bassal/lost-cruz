import { useSignOut } from 'react-firebase-hooks/auth';
import {auth} from '../../firebase'
import { useRouter } from "next/navigation"; // Import Next.js router
import useAuthStore from "../store/authStore";

const useLogout = () => {
    const router = useRouter(); // Initialize Next.js router
    router.push("/auth");
};
export default useLogout