import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

// This hook redirects unauthenticated users to the login page
export const useRequireAuth = () => {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!authUser) {
      router.push("/auth"); // Redirect to login page if not logged in
    }
  }, [authUser, router]);

  return authUser;
};
export default useRequireAuth;
