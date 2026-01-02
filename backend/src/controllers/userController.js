

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../../utils/sendEmail.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

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
// export const createUser = async (req, res) => {
//   try {
//     const { email, password, fullName, role, bookingPermissions } = req.body;

//     // 1️⃣ Check if user already exists
//     // const existingUser = await User.findOne({ email });
//     const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
//     if (existingUser) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'User with this email already exists'
//       });
//     }

//     // 2️⃣ Create new user
//     const newUser = await User.create({
//       email,
//       password,
//       fullName,
//       role: role || 'user',
//       bookingPermissions: bookingPermissions || {
//         smallRoom: true,
//         largeRoom: false
//       }
//     });

//     // 3️⃣ Send email to user
//     const bookingLink = `${process.env.FRONTEND_URL}/meeting-room`;

//     await sendEmail({
//       to: email,
//       subject: 'Your Meeting Room Access',
//       html: `
//         <h2>Welcome ${fullName}</h2>
//         <p>Your account has been created by the admin.</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Password:</strong> ${password}</p>
//         <p>
//           <a href="${bookingLink}" target="_blank">
//             Click here to book a meeting room
//           </a>
//         </p>
//       `
//     });

//     // 4️⃣ Return user without password
//     const userResponse = await User.findById(newUser._id).select('-password');

//     res.status(201).json({
//       status: 'success',
//       data: {
//         user: userResponse
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err.message
//     });
//   }
// };

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../../utils/sendEmail.js';

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

    // 2) Create user
    const newUser = await User.create({
      email: normalizedEmail,
      password,
      fullName,
      role: role || 'user',
      bookingPermissions: bookingPermissions || {
        smallRoom: true,
        largeRoom: false
      }
    });

    // 3) Prepare email
    const bookingLink = `${process.env.FRONTEND_URL}/meeting-room`;

    // 4) Try send email لكن بدون ما نكسر الـ API لو فشل
    let emailSent = false;
    try {
      await sendEmail({
        to: normalizedEmail,
        subject: 'Your Meeting Room Access',
        html: `
          <h2>Welcome ${fullName}</h2>
          <p>Your account has been created by the admin.</p>
          <p><strong>Email:</strong> ${normalizedEmail}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p>
            <a href="${bookingLink}" target="_blank" rel="noreferrer">
              Click here to book a meeting room
            </a>
          </p>
        `
      });
      emailSent = true;
    } catch (mailErr) {
      // مهم: نسجل الخطأ بس منرجعش 500
      console.error('❌ Email sending failed:', mailErr?.message || mailErr);
    }

    // 5) Return user without password
    const userResponse = await User.findById(newUser._id).select('-password');

    return res.status(201).json({
      status: 'success',
      message: emailSent
        ? 'User created and email sent'
        : 'User created but email was NOT sent (check email config)',
      data: {
        user: userResponse,
        emailSent
      }
    });
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