// app/api/sendScheduledEmails/route.js

import nodemailer from 'nodemailer';
import { firestore } from '@/firebase'
import { collection, getDocs, query,} from 'firebase/firestore'
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {

    const authHeader = req.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
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

    users.map(async (user) => {
        // Format the posts into HTML
        const postsHtml = currentData
            .map(
                ({ postID, title, description, imageURL }) => `
                <table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="vertical-align: top;">
                      <h4 style="font-size: 18px; margin-bottom: 5px;">
                        <a href="https://lost-cruz.vercel.app/forum/${postID}" style="color: #1a0dab; text-decoration: none;">${title}</a>
                      </h4>
                      <p>${description}</p>
                    </td>
                    <td style="width: 100px; vertical-align: top; padding-left: 10px;">
                      <img src="${imageURL}" alt="Post Image" width="100" style="border-radius: 8px;" />
                    </td>
                  </tr>
                </table>
                `
            )
          .join('<br>'); // Adds spacing between posts

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: `Posts Digest by Lost@Cruz`,
            html: `
            <p>Hi ${user.username},</p>
            <p>Here are some recent posts:</p>
            ${postsHtml}
            <br><br>
            <p><strong>Lost@Cruz</strong></p>
          `,
        });
    })

    // Respond with a success message
    return NextResponse.json({ ok: true });

  } catch (error) {
      console.error('Failed to send email:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
  }
}