import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const propertyLocation = formData.get('propertyLocation') as string;
    const primaryObjective = formData.get('primaryObjective') as string;
    const inheritance = formData.get('inheritance') as string;
    const description = formData.get('description') as string;
    const recaptcha = formData.get('recaptcha') as string;
    const documents = formData.getAll('documents') as File[];

    // Set to false to disable reCAPTCHA verification (useful for development/testing)
    const ENABLE_RECAPTCHA = false;

    // Verify reCAPTCHA token (only if enabled)
    if (ENABLE_RECAPTCHA) {
      if (!recaptcha || recaptcha === 'disabled') {
        return NextResponse.json({ message: 'reCAPTCHA verification is required.' }, { status: 400 });
      }

      const isRecaptchaValid = await verifyRecaptcha(recaptcha);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Process attachments
    const attachments = await Promise.all(
      documents.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          content: Buffer.from(arrayBuffer).toString('base64'),
          filename: file.name,
          type: file.type,
          disposition: 'attachment' as const,
        };
      })
    );

    // Create email content
    const msg = {
      to: process.env.ADMIN_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: 'New Property Analysis Request',
      html: `
        <h2>New Property Analysis Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Property Location:</strong> ${propertyLocation}</p>
        <p><strong>Primary Objective:</strong> ${primaryObjective}</p>
        <p><strong>Inheritance:</strong> ${inheritance}</p>
        <p><strong>Description:</strong> ${description}</p>
        ${documents.length > 0 ? `<p><strong>Documents:</strong> ${documents.length} file(s) attached</p>` : ''}
      `,
      attachments,
    };

    /* const userMsg = {
      to: businessEmail,
      from: process.env.FROM_EMAIL!,
      subject: 'We’ve Received Your Urgent Assistance Request - Norevia Digital',
      html: `
        <h2>We’ve Received Your Urgent Assistance Request - Norevia Digital</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${businessEmail}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Question:</strong> ${question}</p>
      `,
    };*/

    // Send email
    await sgMail.send(msg);

    return NextResponse.json({ message: 'Property analysis request sent successfully.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error sending fund access request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send fund access request.', error: errorMessage },
      { status: 500 }
    );
  }
}
