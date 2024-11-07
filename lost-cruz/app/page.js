"use client";

import ForumPage from "./forum/page"; // Capitalize the component name
import AuthPage from "./auth/page"; // Capitalize the component name

import useAuthStore from "./store/authStore";
//import Home from "./welcome/page"

// Alternatively, define the component explicitly
const ForumPageComponent = () => <ForumPage />; // Correct arrow function syntax
const AuthPageComponent = () => <AuthPage />;
//const HomePageComponent = () => <Home />

export default function Home() {
  const authUser = useAuthStore((state) => state.user);
  return (
    // TODO <Route path='/' element={authUser ? <Forum/> : <Naigate to="/auth"/> }
    <div>
      {/* Render the ForumPage component */}
      <AuthPageComponent />

      {/* for testing purposes: */}
      {/*<Home />*/}
    </div>
  );
}
