'use client'

import ForumPage from "./forum/page";  // Capitalize the component name
import Home from "./welcome/page"

// Alternatively, define the component explicitly
const ForumPageComponent = () => <ForumPage />;  // Correct arrow function syntax
const HomePageComponent = () => <Home />

export default function HomePage() {
    return (
        <div>
            {/* Render the ForumPage component */}
            <HomePageComponent />

            {/* for testing purposes: */}
            {/*<Home />*/}
        </div>
    );
}