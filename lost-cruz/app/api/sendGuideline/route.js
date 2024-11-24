import nodemailer from 'nodemailer';
import { firestore } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function POST(request) {
    const { postID } = await request.json();

    // Get a reference to the specific document by postID
    const postRef = doc(firestore, 'posts', postID);

    // Fetch the document
    const postSnapshot = await getDoc(postRef);

    // Check if the document exists and extract its data
    const post = { postID: postSnapshot.id, ...postSnapshot.data() };

    const userRef = doc(firestore, 'users', post.userID)

    // Fetch the document
    const userSnapshot = await getDoc(userRef);

    // Check if the document exists and extract its data
    const user = { userID: userSnapshot.id, ...userSnapshot.data() };

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    try {
        // Send the email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Guidelines for Safely Retrieving Lost Items",
            html: `
            <h2 style="text-align:center">Guidelines for Safely Retrieving Lost Items</h2>
            <p>You have been contacted by a user from lost@cruz who might find your lost item. Before getting in touch with this
                user, please take time to read the following tips to ensure a smooth, safe, and trustworthy exchange. </p>
            <ol>
                <li style="font-weight: bold;">
                    Authenticating the Finder
                </li>
                <ul>
                    <li>
                        <p style="font-weight: bold; ">Ask for a Description:</p>
                        <p>Before sharing any details, ask the person who found the item to describe it. For example, you can ask
                            them to describe specific characteristics (e.g., color, unique marks, brand) to confirm they truly have
                            your item.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Request a Photo:</p>
                        <p>Politely request a photo of the item to confirm that it&#39;s yours. This is particularly helpful for items
                            with distinctive features.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Avoid Sharing Personal Information:</p>
                        <p>Don&#39;t share sensitive personal information, such as your real name, student ID number, home address, or
                            other private details, with the finder.</p>
                    </li>
                </ul>

                <li style="font-weight: bold;">
                    Arranging a Safe Meetup Location
                </li>
                <ul>
                    <li>
                        <p style="font-weight: bold; ">Choose a Public Place:</p>
                        <p>Always meet in a well-lit, public area, preferably on campus or in a place with many people around. Good
                            options include:</p>
                        <ul>
                            <li>Any campus mailroom</li>
                            <li>The campus library entrance</li>
                            <li>A busy cafe or food court</li>
                            <li>A campus security office or building lobby</li>
                        </ul>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Inform a Friend:</p>
                        <p>Let a friend or family member know where and when you&#39;re meeting, or consider bringing a friend along for
                            added security.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Avoid Isolated or Unfamiliar Locations:</p>
                        <p>Do not meet in secluded or private areas, and avoid sharing your home address. Avoid picking up the item
                            at a certain location unless sufficient supervision/security is guaranteed.</p>
                    </li>
                </ul>

                <li style="font-weight: bold;">
                    Time of Meetup
                </li>
                <ul>
                    <li>
                        <p style="font-weight: bold; ">Daytime is Best:</p>
                        <p>Whenever possible, arrange to meet during daylight hours. If you need to meet in the evening, choose a
                            well-lit area, such as a campus building or a busy spot on campus, and avoid late hours.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Avoid Last-Minute Changes:</p>
                        <p>If the finder tries to change the location or timing at the last minute to a less public area, consider
                            rescheduling or requesting to meet at the original public location.</p>
                    </li>

                </ul>

                <li style="font-weight: bold;">
                    Communication Tips
                </li>
                <ul>
                    <li>
                        <p style="font-weight: bold; ">Use your School Email:</p>
                        <p>Avoid using any messaging platform that is not school-affiliated. This can help establish authenticity
                            and maintain a record of communication.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Limit Personal Information:</p>
                        <p>Avoid giving away too much personal information. Keep your conversation focused on the item and the
                            logistics for retrieving it.</p>
                    </li>
                </ul>

                <li style="font-weight: bold;">
                    Staying Safe
                </li>
                <ul>
                    <li>
                        <p style="font-weight: bold; ">Trust Your Instincts:</p>
                        <p>If anything feels suspicious or off, don&#39;t hesitate to reschedule or suggest a different location. It&#39;s
                            okay to be cautious.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Notify Campus Security If Needed:</p>
                        <p>If the item is valuable or if you&#39;re unsure about the interaction, you can ask campus security for
                            assistance or even arrange to meet in their office.</p>
                    </li>
                    <li>
                        <p style="font-weight: bold; ">Bring Proof of Ownership:</p>
                        <p>If possible, bring proof that the item is yours, such as a serial number, receipt, or a distinguishing
                            feature that you can show upon meeting. This is especially useful for expensive or unique items.</p>
                    </li>
                </ul>
            </ol>
            <p>Always prioritize your safety and take your time to confirm that the person you're meeting is genuine. If any
                unexpected situation occurs, please contact us or any school staff member for assistance.</p>
            <br>
            <p>- Lost@Cruz</p>
        `,
        });

        // Respond with a success message
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
