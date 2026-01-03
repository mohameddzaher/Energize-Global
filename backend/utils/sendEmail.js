import { Resend } from 'resend';

const sendEmail = async ({ to, subject, html }) => {
  // التحقق من وجود إعدادات Resend API Key
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ Email configuration missing: RESEND_API_KEY not set');
    throw new Error('Email configuration is missing: RESEND_API_KEY not set');
  }

  console.log(`📧 Attempting to send email to: ${to}`);
  console.log(`📧 Using Resend service`);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get from email from environment or use default
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const fromName = process.env.FROM_NAME || 'Meeting Room System';

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error(`❌ Failed to send email to ${to}:`, error);
      throw new Error(error.message || 'Failed to send email');
    }

    console.log(`✅ Email sent successfully to ${to}`);
    console.log(`📧 Message ID: ${data?.id || 'N/A'}`);
    
    return data;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error?.message || error);
    throw error;
  }
};

export default sendEmail;