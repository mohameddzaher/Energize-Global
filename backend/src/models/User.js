

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({

  email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
},

  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // إضافة صلاحيات الحجز للغرف
  bookingPermissions: {
    smallRoom: {
      type: Boolean,
      default: true
    },
    largeRoom: {
      type: Boolean,
      default: false
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model('User', userSchema);