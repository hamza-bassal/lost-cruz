import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../store/authStore"; // Replace with the path to your Zustand auth store

// This hook redirects authenticated users to the homepage (or another page)
export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.user); // Check user status from Zustand

  useEffect(() => {
    if (authUser) {
      router.push("/forum"); // Redirect to the main app page if already logged in
    }
  }, [authUser, router]);
};
export default useRedirectIfAuthenticated;
