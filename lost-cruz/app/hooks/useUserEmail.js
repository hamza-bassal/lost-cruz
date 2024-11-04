// useUserEmail.js
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase"; // Adjust the import path if necessary

const useUserEmail = (uid) => {
    console.log("inside useUserEmail hook");

    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uid) return;

        const fetchEmail = async () => {
            try {
                setLoading(true);
                const userDocRef = doc(firestore, "users", uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setEmail(userDoc.data().email); // Retrieve the email field
                } else {
                    console.log("No such user document!");
                }
            } catch (err) {
                console.error("Error fetching user email:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmail();
    }, [uid]);

    return { email, loading, error };
};

export default useUserEmail;
