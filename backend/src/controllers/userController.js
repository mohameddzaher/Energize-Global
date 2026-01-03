

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../../utils/sendEmail.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find().select('-password');
const users = await User.find().select('-password').sort({ _id: -1 });
    
    res.set('Cache-Control', 'no-store');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};



// Create new user (admin only)
export const createUser = async (req, res) => {
  try {
    const { email, password, fullName, role, bookingPermissions } = req.body;

    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password || !fullName) {
      return res.status(400).json({
        status: 'fail',
        message: 'email, password, fullName are required'
      });
    }

    // 1) Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with this email already exists'
      });
    }

    // 2) Create user مع تعيين mustChangePassword = true
    const newUser = await User.create({
      email: normalizedEmail,
      password,
      fullName,
      role: role || 'user',
      bookingPermissions: bookingPermissions || {
        smallRoom: true,
        largeRoom: false
      },
      mustChangePassword: true // المستخدم الجديد يجب أن يغير الباسورد
    });

    // التحقق من أن mustChangePassword تم تعيينه بشكل صحيح
    console.log(`✅ User created: ${normalizedEmail}`);
    console.log(`✅ mustChangePassword after create: ${newUser.mustChangePassword}`);
    console.log(`✅ mustChangePassword type: ${typeof newUser.mustChangePassword}`);
    
    // إعادة جلب المستخدم من الـ database للتأكد من الحفظ
    const savedUser = await User.findById(newUser._id);
    console.log(`✅ mustChangePassword from DB: ${savedUser.mustChangePassword}`);
    console.log(`✅ mustChangePassword type from DB: ${typeof savedUser.mustChangePassword}`);

    // 3) إعداد الرد فورًا بدون استدعاء إضافي للـ database
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      bookingPermissions: newUser.bookingPermissions,
      mustChangePassword: newUser.mustChangePassword,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    // 4) التحقق من وجود إعدادات الإيميل
    const hasEmailConfig = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    
    // إرسال الرد فورًا بدون انتظار الإيميل
    const responseData = {
      status: 'success',
      message: 'User created successfully',
      data: {
        user: userResponse,
        emailSent: false, // سنحدثها في الخلفية
        emailConfigExists: hasEmailConfig
      }
    };

    // إرسال الرد فورًا (قبل أي شيء آخر)
    res.status(201).json(responseData);
    
    // تسجيل معلومات الإيميل
    if (!hasEmailConfig) {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS not configured. Email will not be sent.');
    }

    // 5) إرسال الإيميل في الخلفية (async بدون انتظار)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const loginLink = `${frontendUrl}/meeting-room`;
    
    // إرسال الإيميل مباشرة (بدون setTimeout) لضمان الإرسال
    (async () => {
      try {
        // التحقق من وجود إعدادات Resend API Key
        if (!process.env.RESEND_API_KEY) {
          console.warn(`⚠️ Cannot send email to ${normalizedEmail}: RESEND_API_KEY not configured`);
          return;
        }

        console.log(`📧 Preparing to send welcome email to: ${normalizedEmail}`);
        console.log(`📧 Using Resend service`);
        
        await sendEmail({
          to: normalizedEmail,
          subject: 'Your Account Has Been Created - Meeting Room System',
          html: `
            <!DOCTYPE html>
            <html dir="ltr" lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #f37121 0%, #ff6b35 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f37121; }
                .button { display: inline-block; background: linear-gradient(135deg, #f37121 0%, #ff6b35 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
                .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome ${fullName}!</h1>
                  <p>Your account has been created successfully</p>
                </div>
                <div class="content">
                  <p>Welcome to the Meeting Room Booking System!</p>
                  
                  <div class="info-box">
                    <h3>Your Account Information:</h3>
                    <p><strong>Email:</strong> ${normalizedEmail}</p>
                    <p><strong>Initial Password:</strong> <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 4px; font-size: 16px;">${password}</code></p>
                  </div>

                  <div class="warning">
                    <strong>⚠️ Important Notice:</strong>
                    <p>This is your initial password. You must change it upon first login for security reasons.</p>
                  </div>

                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${loginLink}" class="button">Login and Change Password</a>
                  </div>

                  <p style="margin-top: 30px;">After logging in, you will be automatically redirected to change your password.</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Meeting Room System - Energize Global</p>
                </div>
              </div>
            </body>
            </html>
          `
        });
        console.log(`✅ Email sent successfully to ${normalizedEmail}`);
      } catch (mailErr) {
        console.error('❌ Email sending failed:', mailErr?.message || mailErr);
        console.error('❌ Full error details:', JSON.stringify(mailErr, null, 2));
        // لا نرمي الخطأ هنا لأن المستخدم تم إنشاؤه بنجاح
      }
    })(); // استدعاء فوري للدالة
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Update user (admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, fullName, role, password, bookingPermissions } = req.body;

    const updateData = {
      email,
      fullName,
      role,
      ...(bookingPermissions && { bookingPermissions })
    };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Update booking permissions
export const updateUserBookingPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { smallRoom, largeRoom } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        bookingPermissions: {
          smallRoom: smallRoom !== undefined ? smallRoom : true,
          largeRoom: largeRoom !== undefined ? largeRoom : false
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};