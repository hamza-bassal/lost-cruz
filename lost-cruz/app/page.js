"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRedirectIfAuthenticated } from "./hooks/useRedirectIfAuthenticated"; // Adjust the path as needed

export default function Home() {
  useRedirectIfAuthenticated();
  const router = useRouter();

  useEffect(() => {
    router.push(`/auth`);
  }, []);

  return (
    <div>
      {/* Render any necessary content, like a loading spinner if waiting for `authUser` */}
      <p>Redirecting...</p>
    </div>
  );
}
