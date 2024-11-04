import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    // Send the email
    console.log(email)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT,
      replyTo: email,  // Ensures replies go to the original sender
      subject: `New message from ${name}`,
      text: `${message}\n\n\nReplies to this email will be sent to the original sender.\n- Lost@Cruz`,
      html: `
        <p>${message}</p>
        <br><br> <!-- Adds two blank lines -->
        <p><strong>Replies to this email will be sent to the original sender.</strong></p>
        <p><strong>- Lost@Cruz<strong></p>
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
