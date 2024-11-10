/*  This document will show on the contact form page
    Users have to read it before contacting other users    */

import styles from "./contact.module.css"

import { Box } from "@mui/material"

const Guideline = () => {
    return (
        <Box className={styles.doc}>
            <Box sx={{ textAlign: 'center' }}>
                <h1>Guidelines for Safely Returning Lost Items</h1>
            </Box>

            <Box className={styles.paragraph}>
                <p>If you have found the lost item described in this post, please use this form to contact the owner. Otherwise, DO NOT use this form.</p>
                <p>Before you contact the owner, please take time to read the following tips to ensure a safe, secure, and respectful exchange.</p>

                <ol>
                    <li>
                        Authenticating the Owner
                    </li>

                    <ul>
                        <li>
                            <p className={styles.subtitle}>Ask for a Description: </p>
                            <p> Before meeting, ask the owner to describe the item to confirm they're the rightful owner. This could include specific details like color, brand, or any unique markings.</p>
                        </li>

                        <li>
                            <p className={styles.subtitle}>Request Proof of Ownership:</p>
                            <p>If the item is valuable (e.g. a phone, laptop, or wallet), you can ask for proof, such as a serial number, a photo, or a specific identifying detail (like a sticker or keychain).</p>
                        </li>

                        <li>
                            <p className={styles.subtitle}>Avoid Sharing Too Many Details:</p>
                            <p>Don't give out too many details about the item upfront. Let the owner provide a description first to ensure it's theirs.</p>
                        </li>
                    </ul>

                    <li>
                        Arranging a Safe Meetup Location
                    </li>
                    <ul>
                        <li>
                            <p className={styles.subtitle}>Meet in a Public Place: </p>
                            <p style={{ marginBottom: '5px' }}>Choose a well-lit, public area where there are likely to be other people around. Ideal locations on campus include:</p>
                            <ul>
                                <li>
                                    Any campus mailroom</li>
                                <li>The campus library entrance</li>
                                <li>A busy cafe or food court</li>
                                <li>A campus security office or building lobby</li>
                            </ul>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Bring a Friend If Possible: </p>
                            <p>Having a friend accompany you can provide additional safety and make the exchange feel more secure for both you and the owner.</p>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Avoid Private or Secluded Locations: </p>
                            <p>Don't arrange to meet in isolated areas, and avoid offering to deliver the item to someone's residence or dorm room. Avoid dropping off the item at a certain location unless sufficient supervision/security is guaranteed.</p>
                        </li>
                    </ul>

                    <li>
                        Time of Meetup
                    </li>
                    <ul>
                        <li>
                            <p className={styles.subtitle}>Choose a Convenient Time:</p>
                            <p>Daytime is best for meetups. If you have to meet in the evening, make sure it's in a well-lit, safe area, such as a campus building or a busy spot on campus, and avoid late hours.</p>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Stick to the Agreed Location and Time:</p>
                            <p>Avoid changing the location at the last minute unless it's to an equally safe, public area. If the owner tries to move the meeting to a less public area, consider rescheduling or insisting on the original location.</p>
                        </li>
                    </ul>

                    <li>
                        Communication Tips
                    </li>
                    <ul>
                        <li>
                            <p className={styles.subtitle}>Use your School Email:</p>
                            <p>Avoid using any messaging platform that is not school-affiliated. This can help establish authenticity and maintain a record of communication.</p>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Limit Personal Information:</p>
                            <p> Keep your conversation focused on the item and arrangements for returning it. Avoid sharing unnecessary personal details.</p>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Stay Professional and Polite:</p>
                            <p> Remember that you're doing a good deed. Be polite and respectful in your communication, and try to be accommodating to the owner's schedule if possible.</p>
                        </li>
                    </ul>

                    <li>
                        Staying Safe
                    </li>
                    <ul>
                        <li>
                            <p className={styles.subtitle}>Trust Your Instincts:</p>
                            <p>If you feel uncomfortable at any point, don't hesitate to reschedule or suggest an alternative, safer location.</p>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Involve Campus Security If Necessary:</p>
                            <p>If the item is especially valuable or you're unsure about the interaction, you can arrange to meet at the campus security office. Some campus security departments may even assist in returning lost items.</p>
                        </li>
                        <li>
                            <p className={styles.subtitle}>Follow Up:</p>
                            <p>Once the item has been returned, it can be courteous to let campus security or other relevant parties know that it's been successfully claimed.</p>
                        </li>
                    </ul>
                </ol>

                <p style={{ marginTop: '30px' }}>
                    Always prioritize your safety and take your time to confirm that the person you're meeting is genuine. If any unexpected situation occurs, please contact us or any school staff member for assistance.
                </p>
                <p>
                    Check the box below if you have understood the guidelines and promise to follow them. Your willingness to help is appreciated, and taking these precautions will make the experience positive for both you and the item's owner.
                </p>
            </Box>
        </Box>
    )
}

export default Guideline