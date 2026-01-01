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
    
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};