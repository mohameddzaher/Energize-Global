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

const sendEmail = async ({ to, subject, html }) => {
  // التحقق من وجود إعدادات الإيميل
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
    throw new Error('Email configuration is missing');
  }

  console.log(`📧 Attempting to send email to: ${to}`);
  console.log(`📧 Using email: ${process.env.EMAIL_USER}`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: (process.env.EMAIL_PASS || '').replace(/\s/g, ''), // يشيل المسافات
    },
    // إضافة timeout لمنع التعطل
    connectionTimeout: 10000, // 10 ثواني
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  // إرسال الإيميل مباشرة بدون verify (لأن verify قد يفشل حتى لو الإرسال يعمل)
  try {
    const info = await Promise.race([
      transporter.sendMail({
        from: `Meeting Room System <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 20000)
      )
    ]);

    console.log(`✅ Email sent successfully to ${to}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    throw error;
  }
};

export default sendEmail;