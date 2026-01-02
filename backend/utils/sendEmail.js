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
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: (process.env.EMAIL_PASS || '').replace(/\s/g, ''), // يشيل المسافات
    },
  });

  // مهم: verify يساعدك تكتشف المشكلة في اللوجز
  await transporter.verify();

  await transporter.sendMail({
    from: `Meeting Room System <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;