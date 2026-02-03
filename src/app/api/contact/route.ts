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

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    // Create email content for admin
    const msg = {
      to: process.env.ADMIN_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: 'New Property Analysis Request',
      html: `
        <h2>New Property Analysis Request</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Property Location:</strong> ${escapeHtml(propertyLocation)}</p>
        <p><strong>Primary Objective:</strong> ${escapeHtml(primaryObjective)}</p>
        <p><strong>Inheritance:</strong> ${escapeHtml(inheritance)}</p>
        <p><strong>Description:</strong> ${escapeHtml(description)}</p>
        ${documents.length > 0 ? `<p><strong>Documents:</strong> ${documents.length} file(s) attached</p>` : ''}
      `,
      attachments,
    };

    // Create confirmation email for user
    const userMsg = {
      to: email,
      from: process.env.FROM_EMAIL!,
      subject: "We've Received Your Message",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received - Estanora</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background-color: #1a1a1a;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                We've Received Your Message
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Dear Customer,
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Thank you for contacting Estanora.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Your message has been received and forwarded to our support team. A member of our team will review your request and get back to you shortly using this email address.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                If you have additional details to share, you may reply directly to this message.
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Kind regards,<br>
                <strong style="color: #ffffff;">The Estanora Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: rgba(255, 255, 255, 0.03); border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
                © ${new Date().getFullYear()} Estanora. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    // Send emails
    await sgMail.send(msg);
    await sgMail.send(userMsg);

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
