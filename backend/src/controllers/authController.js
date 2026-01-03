import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if username and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!'
      });
    }

    // 2) Check if user exists && password is correct
    // جلب المستخدم بدون select('+password') أولاً للتحقق من mustChangePassword
    let user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // جلب الباسورد للتحقق
    user = await User.findOne({ email }).select('+password');
    
    if (!(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // 3) Log mustChangePassword status for debugging
    console.log(`🔐 User ${email} login`);
    console.log(`🔐 mustChangePassword value from DB: ${user.mustChangePassword}`);
    console.log(`🔐 mustChangePassword type: ${typeof user.mustChangePassword}`);
    console.log(`🔐 mustChangePassword === true: ${user.mustChangePassword === true}`);
    console.log(`🔐 mustChangePassword == true: ${user.mustChangePassword == true}`);
    console.log(`🔐 mustChangePassword !== false: ${user.mustChangePassword !== false}`);
    console.log(`🔐 mustChangePassword !== undefined: ${user.mustChangePassword !== undefined}`);
    console.log(`🔐 mustChangePassword !== null: ${user.mustChangePassword !== null}`);

    // 4) If everything ok, send token to client
    const token = signToken(user._id);

    // التأكد من أن mustChangePassword boolean - تحقق شامل
    // إذا كانت القيمة true أو 'true' أو 1 أو غير false/undefined/null
    const mustChangePassword = user.mustChangePassword === true 
      || user.mustChangePassword === 'true' 
      || user.mustChangePassword === 1
      || (user.mustChangePassword !== false && user.mustChangePassword !== undefined && user.mustChangePassword !== null);

    const responseData = {
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          mustChangePassword: Boolean(mustChangePassword) // تحويل إلى boolean صريح
        }
      }
    };

    console.log(`✅ Login successful for ${email}`);
    console.log(`✅ mustChangePassword calculated: ${mustChangePassword}`);
    console.log(`✅ Sending mustChangePassword: ${responseData.data.user.mustChangePassword}`);

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// تغيير الباسورد (للمستخدمين الذين يجب عليهم تغيير الباسورد)
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // 1) التحقق من وجود البيانات المطلوبة
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide current password and new password'
      });
    }

    // 2) التحقق من طول الباسورد الجديد
    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 'fail',
        message: 'New password must be at least 6 characters long'
      });
    }

    // 3) جلب المستخدم مع الباسورد
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    // 4) التحقق من صحة الباسورد الحالي
    if (!(await user.correctPassword(currentPassword, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Current password is incorrect'
      });
    }

    // 5) تحديث الباسورد وإلغاء mustChangePassword
    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    // 6) إرجاع النتيجة
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};