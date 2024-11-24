// app/api/sendScheduledEmails/route.js

import nodemailer from 'nodemailer';
import { firestore } from '@/firebase'
import { collection, getDocs, query, orderBy, where} from 'firebase/firestore'

export async function POST(request) {
  try {
    console.log(request)

    const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new Response('Unauthorized', {
    //     status: 401,
    //   });
    // }
    
    const snapshot_user = query(collection(firestore, 'users'));
    const docs_users = await getDocs(snapshot_user);
    const users = docs_users.docs.map((doc) => ({ userID: doc.id, ...doc.data() }));

    const snapshot_post = query(
      collection(firestore, 'posts'),
      orderBy('timestamp', 'desc') // Order by the 'timestamp' field in descending order
    );
    const docs_posts = await getDocs(snapshot_post);
    const posts = docs_posts.docs.map((doc) => ({ postID: doc.id, ...doc.data() }));

    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const currentData = posts.slice(0, 10);

    users.map(async (user) => {

        const { digestTags, digestStatus } = user;

        // Format the posts into HTML
        let postsHtml = currentData
		.map(
			({ postID, title, description, imageURL }) => {
				// Clip the description to 500 characters
				let clippedDescription = description;
				if (clippedDescription.length > 500) {
					clippedDescription = clippedDescription.slice(0, 500) + '...';
				}

				return `
				<table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
				<tr>
					<td style="vertical-align: top;">
					<h4 style="font-size: 18px; margin-bottom: 5px;">
						<a href="https://lost-cruz.vercel.app/forum/${postID}" style="color: #1a0dab; text-decoration: none;">${title}</a>
					</h4>
					<p>${clippedDescription}</p>
					</td>
					<td style="width: 100px; vertical-align: top; padding-left: 10px;">
					<img src="${imageURL}" alt="Post Image" width="100" style="border-radius: 8px;" />
					</td>
				</tr>
				</table>
				`;
			}
		)
		.join('<br>'); // Adds spacing between posts

		// Add the message if digestTags or digestStatus is not empty
		if (digestTags?.length > 0 || digestStatus?.length > 0) {
			postsHtml += '<br><p style="font-size: 16px; color: #333;">Here are some posts that would interest you:</p>';

			let snapshot_preferred_post;

			if (digestTags?.length > 0 && (digestStatus?.length == 0 || digestStatus?.length == 2)) {
				snapshot_preferred_post = query(
					collection(firestore, 'posts'),
					orderBy('timestamp', 'desc'), // Order by the 'timestamp' field in descending order
					where('tags', 'array-contains-any', digestTags),
				);
			} else if (digestTags?.length > 0 && digestStatus?.length == 1) {
				snapshot_preferred_post = query(
					collection(firestore, 'posts'),
					orderBy('timestamp', 'desc'), // Order by the 'timestamp' field in descending order
					where('tags', 'array-contains-any', digestTags),
					where('lostOrFound', '==', digestStatus[0]),
				);
			} else if (digestTags?.length == 0) {
				snapshot_preferred_post = query(
					collection(firestore, 'posts'),
					orderBy('timestamp', 'desc'), // Order by the 'timestamp' field in descending order
					where('lostOrFound', 'in', digestStatus),
				);
			}
			
			const preferred_docs = await getDocs(snapshot_preferred_post);
			const preferred_posts = preferred_docs.docs.map((doc) => ({ postID: doc.id, ...doc.data() }));

			const currentData_preferred = preferred_posts.slice(0, 5);

			const preferred_postsHtml = currentData_preferred
            .map(
				({ postID, title, description, imageURL }) => {
					// Clip the description to 500 characters
					let clippedDescription = description;
					if (clippedDescription.length > 500) {
						clippedDescription = clippedDescription.slice(0, 500) + '...';
					}
	
					return `
					<table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
					<tr>
						<td style="vertical-align: top;">
						<h4 style="font-size: 18px; margin-bottom: 5px;">
							<a href="https://lost-cruz.vercel.app/forum/${postID}" style="color: #1a0dab; text-decoration: none;">${title}</a>
						</h4>
						<p>${clippedDescription}</p>
						</td>
						<td style="width: 100px; vertical-align: top; padding-left: 10px;">
						<img src="${imageURL}" alt="Post Image" width="100" style="border-radius: 8px;" />
						</td>
					</tr>
					</table>
					`;
				}
			)
			.join('<br>'); // Adds spacing between posts

			postsHtml += preferred_postsHtml;
		}

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
    return Response.json({ success: true });

  } catch (error) {
      console.error('Failed to send email:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
  }
}