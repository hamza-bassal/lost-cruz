// app/api/sendScheduledEmails/route.js

import nodemailer from 'nodemailer';
import { firestore } from '@/firebase'
import { collection, getDocs, query,} from 'firebase/firestore'

export async function POST() {
  try {
    
    const snapshot_user = query(collection(firestore, 'users'));
    const docs_users = await getDocs(snapshot_user);
    const users = docs_users.docs.map((doc) => ({ userID: doc.id, ...doc.data() }));

    const snapshot_post = query(collection(firestore, 'posts'));
    const docs_posts = await getDocs(snapshot_post);
    const posts = docs_posts.docs.map((doc) => ({ postID: doc.id, ...doc.data() }));

    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const currentData = posts.slice(0, 10);

    // Send emails to each user
    // await Promise.all(
    //   users.map(async (user) => {
    //     const mjmlContent = template({ name: user.name });
    //     const { html } = mjml2html(mjmlContent);

    //     await transporter.sendMail({
    //       from: process.env.EMAIL_USER,
    //       to: user.email,
    //       subject: 'Scheduled Email',
    //       html,
    //     });
    //   })
    // );

    users.map(async (user) => {
        // Format the posts into HTML
        const postsHtml = currentData
            .map(
                ({ postID, title, description, imageURL }) => `
                <h4 style="font-size: 18px; margin-bottom: 5px;">
                <a href="https://lost-cruz.vercel.app/forum/${postID}" style="color: #1a0dab; text-decoration: none;">${title}</a>
                </h4>
                <p>${description}</p>
            `
            )
          .join('<br>'); // Adds spacing between posts

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT,
            replyTo: user.email,  // Ensures replies go to the original sender
            subject: `Posts Digest by Lost@Cruz`,
            html: `
            <p>Hi ${user.name},</p>
            <p>Here are some recent posts:</p>
            ${postsHtml}
            <br><br>
            <p><strong>Replies to this email will be sent to the original sender.</strong></p>
            <p><strong>- Lost@Cruz</strong></p>
          `,
        });
    })

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