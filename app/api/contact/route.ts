import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { firstName, lastName, email, phone, service, message } = body

  try {
    const data = await resend.emails.send({
      from: 'Your Portfolio <onboarding@resend.dev>',
      to: 'franklinmuriithi431@gmail.com',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error })
  }
}


/* import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const { firstName, lastName, email, phone, service, message } = body

  console.log('New Contact Form Submission:', body)

  // TODO: Send this data somewhere (email, database, webhook, etc.)

  return NextResponse.json({ success: true })
}
 */