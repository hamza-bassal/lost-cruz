// app/api/cron/route.js

import { NextResponse } from 'next/server';

export async function GET(req) {
  // Check for the CRON_SECRET in the Authorization header
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Perform your cron job tasks here, for example:
  // Send emails, update data, etc.
  
  // Respond with a success message if the task completes
  return NextResponse.json({ ok: true });
}