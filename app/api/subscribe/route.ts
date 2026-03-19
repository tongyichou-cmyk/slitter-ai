import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  // TODO Phase 2: integrate email provider (ConvertKit / Mailchimp)
  console.log('New subscriber:', email)
  return NextResponse.json({ success: true })
}
