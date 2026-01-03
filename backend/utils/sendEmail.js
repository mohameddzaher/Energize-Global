import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  // التحقق من وجود إعدادات الإيميل
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
    throw new Error('Email configuration is missing');
  }

  console.log(`📧 Attempting to send email to: ${to}`);
  console.log(`📧 Using email: ${process.env.EMAIL_USER}`);

  try {
    // استخدام service: 'gmail' بدلاً من host/port - هذا أفضل للخوادم السحابية
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || '').replace(/\s/g, ''), // Remove spaces
      },
      // إعدادات محسّنة للخوادم السحابية
      pool: false, // لا نستخدم pool للخوادم السحابية
      maxConnections: 1,
      maxMessages: 1,
      // تقليل timeout للخوادم السحابية
      connectionTimeout: 15000, // 15 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 15000, // 15 seconds
      // إعدادات TLS محسّنة
      secure: true,
      requireTLS: true,
      tls: {
        rejectUnauthorized: false, // للخوادم السحابية
        minVersion: 'TLSv1.2',
      },
    });

    // إرسال الإيميل مع timeout أقصر
    const mailOptions = {
      from: `Meeting Room System <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout after 20s')), 20000)
      )
    ]);

    console.log(`✅ Email sent successfully to ${to}`);
    console.log(`📧 Message ID: ${info.messageId || 'N/A'}`);
    
    // إغلاق الاتصال فوراً
    transporter.close();
    
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error?.message || error);
    throw error;
  }
};

export default sendEmail;