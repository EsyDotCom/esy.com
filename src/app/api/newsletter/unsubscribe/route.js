import { NextResponse } from 'next/server';

import { callEsy, unsubscribeOutcome } from '@/lib/newsletter/esy';

/* The unsubscribe link in emails Esy sends itself (the confirmation and the
   reminder, 2026-11-03). /newsletter/unsubscribe posts the link's token here
   when the reader presses the button, and Esy, which signed it, takes them
   off The Marketing Engineer and nothing else. Mail apps' own one-click
   unsubscribe goes straight to Esy and never passes through here. */

export async function POST(request) {
  try {
    const { token } = await request.json();
    if (typeof token !== 'string' || !token) {
      return NextResponse.json({ error: 'This link isn’t valid.' }, { status: 400 });
    }
    const outcome = unsubscribeOutcome(await callEsy('unsubscribe', { token }));
    return NextResponse.json(outcome.body, { status: outcome.status });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json({ error: 'Couldn’t unsubscribe you just now. Please try again in a minute.' }, { status: 500 });
  }
}
