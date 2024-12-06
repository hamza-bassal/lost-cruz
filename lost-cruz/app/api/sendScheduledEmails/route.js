import nodemailer from 'nodemailer';
import { firestore } from '@/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      	return new Response('Unauthorized', { status: 401 });
    }

    // Fetch users
    const userQuery = query(
      collection(firestore, 'users'),
      where('subscribed','==', true),
      );
    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs.map(doc => ({ userID: doc.id, ...doc.data() }));

    // Fetch latest posts
    const postQuery = query(
		collection(firestore, 'posts'),
		orderBy('timestamp', 'desc')
    );
    const postSnapshot = await getDocs(postQuery);
    const posts = postSnapshot.docs.map(doc => ({ postID: doc.id, ...doc.data() }));

    // Email transporter setup
    const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		},
    });

    // Email sending logic
    const emailPromises = users.map(async user => {
      const { digestTags, digestStatus, email, username } = user;

      // Generate posts HTML
      const recentPostsHtml = posts
        .slice(0, 10)
        .map(({ postID, title, description, imageURL }) => {
          const clippedDescription = description.length > 500 ? `${description.slice(0, 500)}...` : description;
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
        })
        .join('');

      // Additional posts for preferences
      let preferredPostsHtml = '';
      if (digestTags?.length || digestStatus?.length) {
        let preferredQuery;

		if (digestTags?.length > 0 && (digestStatus?.length == 0 || digestStatus?.length == 2)) {
			preferredQuery = query(
				collection(firestore, 'posts'),
				orderBy('timestamp', 'desc'), // Order by the 'timestamp' field in descending order
				where('tags', 'array-contains-any', digestTags),
			);
		} else if (digestTags?.length > 0 && digestStatus?.length == 1) {
			preferredQuery = query(
				collection(firestore, 'posts'),
				orderBy('timestamp', 'desc'), // Order by the 'timestamp' field in descending order
				where('tags', 'array-contains-any', digestTags),
				where('lostOrFound', '==', digestStatus[0]),
			);
		} else if (digestTags?.length == 0) {
			preferredQuery = query(
				collection(firestore, 'posts'),
				orderBy('timestamp', 'desc'), // Order by the 'timestamp' field in descending order
				where('lostOrFound', 'in', digestStatus),
			);
		}

        const preferredSnapshot = await getDocs(preferredQuery);
        const preferredPosts = preferredSnapshot.docs.map(doc => ({ postID: doc.id, ...doc.data() }));

        preferredPostsHtml = preferredPosts
          .slice(0, 5)
          .map(({ postID, title, description, imageURL }) => {
            const clippedDescription = description.length > 500 ? `${description.slice(0, 500)}...` : description;
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
          })
          .join('');
      }

      // Combine HTML content
      const emailHtml = `
        <p>Hi ${username},</p>
        <p>Here are some recent posts:</p>
        ${recentPostsHtml}
        ${preferredPostsHtml ? `<p>Posts tailored to your preferences:</p>${preferredPostsHtml}` : ''}
        <br><br> <!-- Adds two blank lines -->
        <p><strong>You can unsubscribe to the digest in your post preferences settings.</strong></p>
        <p><strong>- Lost@Cruz<strong></p>
      `;

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Posts Digest by Lost@Cruz',
        html: emailHtml,
      });
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Failed to send emails:', error);
    return new Response(JSON.stringify({ error: 'Failed to send emails' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
