'use client'

import ForumPage from "./forum/page";  // Capitalize the component name
import useAuthStore from "./store/authStore"

// Alternatively, define the component explicitly
const ForumPageComponent = () => <ForumPage />;  // Correct arrow function syntax

export default function Home() {
    const authUser = useAuthStore(state => state.user);
    return (
        // TODO <Route path='/' element={authUser ? <Forum/> : <Naigate to="/auth"/> }
        <div>
            {/* Render the ForumPage component */}
            <ForumPageComponent />

            {/* for testing purposes: */}
            {/*<Home />*/}
        </div>
    );
}