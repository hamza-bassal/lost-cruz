'use client'

import ForumPage from "./forum/page";  // Capitalize the component name

// Alternatively, define the component explicitly
const ForumPageComponent = () => <ForumPage />;  // Correct arrow function syntax

export default function Home() {
    return (
        <div>
            {/* Render the ForumPage component */}
            <ForumPageComponent />  
        </div>
    );
}