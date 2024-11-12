"use client"
// app/verify-email/page.js
import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
    const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();

    const resendVerificationEmail = async () => {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
            setEmailSent(true);
        }
    };

    // Auto-redirect after verification
    useEffect(() => {
        const checkVerification = setInterval(async () => {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                clearInterval(checkVerification);
                router.push("/forum"); // Redirect after verification
            }
        }, 3000); // Check every 3 seconds

        return () => clearInterval(checkVerification);
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h5">Verify Your Email</Typography>
            <Typography variant="body1" style={{ margin: "20px 0" }}>
                A verification email has been sent to your email address. Please check your inbox and click the verification link to activate your account.
            </Typography>
            {emailSent && <Typography variant="body2" color="green">Verification email resent successfully!</Typography>}
            <Button variant="contained" color="primary" onClick={resendVerificationEmail}>
                Resend Verification Email
            </Button>
        </div>
    );
};

export default VerifyEmail;
