// import nodemailer from 'nodemailer';

// const sendEmail = async ({ to, subject, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Meeting Room System" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };

// export default sendEmail;

import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, retries = 2 }) => {
  // التحقق من وجود إعدادات الإيميل
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
    throw new Error('Email configuration is missing');
  }

  console.log(`📧 Attempting to send email to: ${to}`);
  console.log(`📧 Using email: ${process.env.EMAIL_USER}`);

  // Try port 587 with TLS first (better for cloud servers like Render)
  const createTransporter = (useTLS = true) => {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: useTLS ? 587 : 465,
      secure: !useTLS, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || '').replace(/\s/g, ''), // Remove spaces
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      // Increased timeouts for cloud servers
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
      // Pool connections for better reliability
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
    });
  };

  // Retry logic with different configurations
  let lastError = null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Try TLS (port 587) first, then SSL (port 465)
      const useTLS = attempt % 2 === 0;
      const transporter = createTransporter(useTLS);
      
      console.log(`📧 Attempt ${attempt + 1}/${retries + 1} - Using ${useTLS ? 'TLS (587)' : 'SSL (465)'}`);

      const info = await Promise.race([
        transporter.sendMail({
          from: `Meeting Room System <${process.env.EMAIL_USER}>`,
          to,
          subject,
          html,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email sending timeout after 30s')), 30000)
        )
      ]);

      console.log(`✅ Email sent successfully to ${to}`);
      console.log(`📧 Message ID: ${info.messageId}`);
      
      // Close transporter
      transporter.close();
      return info;
    } catch (error) {
      lastError = error;
      console.error(`❌ Attempt ${attempt + 1} failed:`, error.message);
      
      // If it's not the last attempt, wait before retrying
      if (attempt < retries) {
        const waitTime = (attempt + 1) * 2000; // Exponential backoff: 2s, 4s
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // All attempts failed
  console.error(`❌ Failed to send email to ${to} after ${retries + 1} attempts`);
  console.error(`❌ Last error:`, lastError?.message || lastError);
  throw lastError || new Error('Email sending failed after all retries');
};

export default sendEmail;